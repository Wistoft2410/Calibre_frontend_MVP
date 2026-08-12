import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { NeuView, NeuInput, NeuButton } from './neu-element';
import { Dimensions } from 'react-native';
import { BACKGROUND, RADIUS, COLOR, PLACEHOLDER} from './Style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const access_key = "TEST123";

const serverName = require('./appSettings/db.json');

class SchoolsInput extends Component {
 

  state = {
    query: this.props.query || '',
    schools: [],
    showList: false,
    isLoading: false,
  };

  timeout = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        query: this.props.query,
        showList: true
      }, () => {
        this.fetchschools()
      })
    }
  }


  componentDidMount() {
    if (this.props.query) {
      this.fetchschools()
    }
  }
  focus = () => {
    this.setState({showList: true});
    this.props.onFocus
  }

  render() {
    return (
      <View style={[styles.container, this.props.stylesContainer]}>
        <TextInput
          color={COLOR}
          placeholderTextColor={PLACEHOLDER}
          placeholder={this.props.placeHolder}
          style={[styles.input, this.props.stylesInput]}
          onChangeText={query => {
            this.setState({query}, () => {
              this.onSchoolSearch();
              this.props.onChangeText && this.props.onChangeText(query, this);
            });
          }}
          value={this.state.query}
          onFocus={ () => this.setState({showList: true})}
          onBlur={() => this.setState({showList: false})}
          {...this.props.textInputProps}
          clearButtonMode="always"
          
        />
        {this.state.showList && (
          
          <View 
            style={[styles.scrollView, this.props.stylesList]}
            keyboardShouldPersistTaps="always"
          >
            <NeuView color={BACKGROUND} width={windowWidth-80} height={150} borderRadius={RADIUS}>
              <ScrollView keyboardShouldPersistTaps="always" width={windowWidth-80}>
                <View style={{paddingBottom: 60}} >
                  {this.props.contentScrollViewTop}
                  {this.state.isLoading && (
                    <ActivityIndicator
                      size="small"
                      style={[styles.loading, this.props.stylesLoading]}
                    />
                  )}
                  {this.state.schools.map(school => {
                    return (
                      <TouchableOpacity
                        key={`school-${school.ID}`}
                        style={[styles.school, this.props.stylesItem]}
                        onPress={() => this.onSchoolSelect(school.ID, school.institution)}
                      >
                        <Text style={[styles.schoolText, this.props.stylesItemText]}>
                          {school.institution}
                        </Text>
                        {this.props.iconResult}
                      </TouchableOpacity>
                    );
                  })}
                  {this.props.contentScrollViewBottom}
                  </View>
              </ScrollView>
            </NeuView>
          </View>
        )}
      </View>
    );
  }

  onSchoolSearch = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.fetchSchools, this.props.requiredTimeBeforeSearch);
  };

 

  fetchSchools = async () => {
    if (
      !this.state.query ||
      this.state.query.length < this.props.requiredCharactersBeforeSearch
    ) {
      return;
    }
    this.setState(
      {
        showList: true,
        isLoading: true,
      },
      async () => {
        const schools = await fetch(
          serverName.app.db + `schools.php`, {
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
              "access_token": access_key,
              "institution": this.state.query,
              "institutionType": this.props.institutionType,
            })
          })
          .then(response => response.json())
          .then((responseJson) =>{
            this.setState({
              isLoading: false,
              schools: responseJson,
            });
          })
          .catch((error)=>{
            console.error(error);
          });
        
      }
    );
  };

  onSchoolSelect = async (id, passedSchool) => {
    const {clearQueryOnSelect} = this.props;

    this.setState({
      isLoading: true,
    }, async () => {
      try {
        const school = await fetch(
          serverName.app.db + `school.php`, {
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
              "access_token": access_key,
              "id": id
            })
          }).then(response => response.json())
          
          .catch((error)=>{
            console.error(error);
          });
          
        return this.setState(
          {
            showList: false,
            isLoading: false,
            query: passedSchool,
          },
          () => {
            return this.props.onSelect && this.props.onSelect(school);
          }
        );
      } catch (e) {
        return this.setState(
          {
            isLoading: false,
            showList: false,
            query: passedSchool,
          },
          () => {
            return this.props.onSelect && this.props.onSelect(passedSchool);
          }
        );
      }
    });
  };
}

SchoolsInput.propTypes = {
  clearQueryOnSelect: PropTypes.bool,
  contentScrollViewBottom: PropTypes.node,
  contentScrollViewTop: PropTypes.node,
  stylesInput: PropTypes.object,
  stylesContainer: PropTypes.object,
  stylesList: PropTypes.object,
  stylesItem: PropTypes.object,
  stylesItemText: PropTypes.object,
  stylesLoading: PropTypes.object,
  resultRender: PropTypes.func,
  query: PropTypes.string,
  queryFields: PropTypes.string,
  queryCountries: PropTypes.array,
  queryTypes: PropTypes.string,
  querySession: PropTypes.string,
  searchRadius: PropTypes.number,
  searchLatitude: PropTypes.number,
  searchLongitude: PropTypes.number,
  placeHolder: PropTypes.string,
  textInputProps: PropTypes.object,
  iconResult: PropTypes.any,
  iconInput: PropTypes.any,
  language: PropTypes.string,
  onSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  requiredCharactersBeforeSearch: PropTypes.number,
  requiredTimeBeforeSearch: PropTypes.number,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  institution: PropTypes.string,
};



SchoolsInput.defaultProps = {
  stylesInput: {},
  stylesContainer: {},
  stylesList: {},
  stylesItem: {},
  stylesLoading: {},
  stylesItemText: {},
  queryFields: 'school',
  placeHolder: 'Search schools...',
  textInputProps: {},
  language: 'en',
  resultRender: school => school.description,
  requiredCharactersBeforeSearch: 1,
  requiredTimeBeforeSearch: 1000,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingHorizontal: 12,
    letterSpacing: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginTop: 15,
    marginBottom: 15,
  },
  school: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    position: 'relative',
    zIndex: 10001,
    width: '96%',
    marginLeft: '2%'
  },
  schoolIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: 'rgba(0,0,0,0.3)',
  },
  schoolText: {
    color: COLOR,
    paddingRight: 60,
    letterSpacing: 1,
  },
  loading: {
    margin: 10,
  },
});

export default SchoolsInput;
