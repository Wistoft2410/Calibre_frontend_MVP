-- Calibre: richer detail for partner venues (photo, description, contact, rating).
-- Values pulled from Google Places for the partners already in the table.
-- Run in the Supabase Dashboard -> SQL Editor. Safe to re-run.

-- ============================================================
-- 1. New columns
-- ============================================================
alter table public.venues add column if not exists description       text;
alter table public.venues add column if not exists phone             text;
alter table public.venues add column if not exists website           text;
alter table public.venues add column if not exists rating            numeric(2,1);
alter table public.venues add column if not exists reviews_count     integer;
alter table public.venues add column if not exists google_place_id   text;
alter table public.venues add column if not exists photo_reference   text;

-- description stays null where Google had no editorial summary; the detail
-- screen simply omits the paragraph. Write your own partner copy here rather
-- than leaving Google's - it is yours to control.

-- ============================================================
-- 2. Fill from Google Places
-- ============================================================
update public.venues set
    phone = '+45 31 48 61 69', website = 'http://www.airtrix.dk/',
    rating = 4.4,
    reviews_count = 841,
    google_place_id = 'ChIJkVPyB75SUkYRgqp1-gZ61mQ', photo_reference = 'AVoNoXQZURDjL-AqOJBRKqbt883CcWFuOR9tk7iHkOGS1uOlFOmpd9BLhYq22wk1W9UMQau05Tn9jXX6pim9X7XQb1m6dQ_LwTRj-r4VsbfNP-b4d0R8X4PaKpW2pnxX4q3GenTzV4u3cPTU4lFaOWiNehJfIW9GBtvYzADsdTrQ6t5EveRaB0zxuMP1hMP0MLjYTKjEo-SlKNGQcNC7Qce_wTnD8jdklARgX7jTLy3_ZCu80KbAxjdcAbBvxXCSaBYxSXrEqTx23p-R76g2NPcqf4rHC0LphRIUmWoAC13eRU1U6uum-gTPt-_wEdLRb5kFTPOe51GmRlcBlktmjS_nrSNNsM7aEy_5SU6uNxuLCKJy-djpgbfZ6XYOiKALgZePbPbrPIgGzyZUbufMbOIMSB7HjG57OlZi5jXE17CHYVukr_Y6',
    description = coalesce(description, null)
  where name = 'Airtrix Klatre & Trampolinpark';
update public.venues set
    phone = null, website = null,
    rating = 4.7,
    reviews_count = 79,
    google_place_id = 'ChIJUxgfe2VTUkYRocAMJ8e28U4', photo_reference = 'AVoNoXRZKa8qN66ntyBnBL9E3mno8FEYbQM8MTW8bzPLPUugALmA5V9_clOaCQzK1ya0HFoCaN4G8grhz8O7XfH8b4CjbWNtLM38ThkeU-9qP5-q3R3j9wbJsACtz03x-dd25iXILmE5FW0krpvOBADCfbTtAksz3TCuMIQ5_RlO1zQQOujLDHIptMYVPgoqBClnGGjeY6PC2NbMrem-nvk4m2kYTyXxswI3EpxxTl2l3NgHP1QWKh1kxkKK7STXrorEpqsY1qa0-bT1udZlujPFP15leIBTS1rKrUCFE_NIJ9OHKhtkDValaQcttliOP5zK0mis11ytT6W3STiQwTG0obhowaIpIhGIg9_6XkLBMiK8ImopHwzBFwvMz216OIomIYXKwjvdxk8XFDlfirGFIYSUrbsG-LiDzesql-XUWiM',
    description = coalesce(description, null)
  where name = 'Art Escape Studios & Cafe';
update public.venues set
    phone = '+45 42 74 66 42', website = 'http://www.bastardcafe.dk/',
    rating = 4.7,
    reviews_count = 5240,
    google_place_id = 'ChIJU3W3ZBFTUkYRR1sx91IE5FM', photo_reference = 'AVoNoXTYvw66P1VOqjm0O2SQ6OIaSl1Qv_jLvOGDCbSJT-ro6UMNl8Xj-4Dt0UWJCRRw08idyewYPRbPQ59QeSHmzkYV1Nc2_EA7OFWUkpMj3bKDRcOXNG7FwhSXMqiXnZyDqCJFrogPXSg4TrR0F6I_N0lZ6nJHh80Pr6KszDW5vwIq43d6PPO33Gc11Mj_qAF7hCNrqwO-XRaspigswL52pM9zDYKwynLAriVhyogIh0yMFO3lgNT6kw483moQi4eF-j3qsNzGuWqUXk8vZFPqYAK3k4c7Bxt9GAier2p0GIZqyHPRUZjDOq7O3EGn-Fsufk8m5BaVivLndPcL03a648I6s14zJKBBmMgCFUp5xjLT4EIv_j4E4KYCjx47fuklWIvGf4lsxZEflhSGRajP113BFBK4ZVkwGcQWZpSE1mk',
    description = coalesce(description, 'Beer, coffee & light fare are served at this lively hangout that has a large board game collection.')
  where name = 'Bastard Cafe';
update public.venues set
    phone = null, website = 'http://bipbipbar.dk/',
    rating = 4.4,
    reviews_count = 1265,
    google_place_id = 'ChIJn9TrBQdTUkYRiIoESCwtNT4', photo_reference = 'AVoNoXSnQyBX499Z_S3VEOqvKvP8JGBZB8bQS7g9RdUPharev0elDfl6dDkHFWBiRkxBH8R7sKtWNBKFDkpwUq9Us4nhWHNIHGFsub3QZaaOcRBYxUYO3bFwtf0jAOF8eiBVeSt2MRBcgcH5c2Ew2AN7PvQnzaVCvnDUbK8C30zIzBZQyVKRZa3aUdleEXFZjk7dGJXFAa1_cqt8R2wWbv6qtS_hTsSxg4kwR2HpPqlarrUbvbEtDgwDvsziRnJtL0og4nDJ7W4-W5VgFeRcOJiNR68-B8j8buwsGEj1LHGof5VE-VOt976rk0TOvPOFVGTAt6KSbiCn69LN0X0LggXmnlv7yvAO0JyIC9ElmhADrkE7TtfYlJt87RWagvM6tPZnpLn6zb7ZeOMi-aP5oMgnHcinKOhIHLSFmhBF4MBElIaRcA',
    description = coalesce(description, null)
  where name = 'Bip Bip Bar';
update public.venues set
    phone = '+45 35 37 24 42', website = 'http://www.kroteket.dk/',
    rating = 4.4,
    reviews_count = 794,
    google_place_id = 'ChIJh3-WeQdTUkYRrobCVy-pETw', photo_reference = 'AVoNoXQ085Or-ydgbO_MS6qctcMyol1w8LwPvRpW3dmBqIqQWSJ1OGlabW6mYmWDlqzighpjNaTWIDIj_866j2ayhaVKsy9lqJ6nKZ_Fs_n2J8owJcHxBVe80hBFvKJj-BWFdl8TtfeIe67scFjIhrVBh-DQs1jiy5LnfwuIL30GyhJhUOXaL0DenDHF_q9IKaF-gIYiZOYIQn6Holzp9P9hFQpCfCh-JwO_4zBF-wEp5DF2fLc9k7OD0dTrF0NlYdOzeC3YUoCpYiKmAA8NA3KMF9XPkz6G1eW9OglXcov2eZ9BiEbDng58av0yFh_7-CPu9QADc1NFJlhv2DQfgpPtnrAdplA1LuVbWWShh-whMun8If_M4FESNxEl7MitgLqXp_aEN76fmuDIvSI-wnvkOOXskLvhEDjdGnz5kNgteILNvA',
    description = coalesce(description, 'Candlelit hangout for jazz, blues & rock gigs in a mellow vibe, plus a few outdoor pavement tables.')
  where name = 'Blågård''s Pharmacy';
update public.venues set
    phone = '+45 39 30 40 45', website = 'http://www.booksandcompany.dk/',
    rating = 4.8,
    reviews_count = 142,
    google_place_id = 'ChIJefw7F3pSUkYRy253GOKd0nM', photo_reference = 'AVoNoXTQdzpte0hmrGgPFeZLNu9jOaiR6MvkcXoU2MP0wY2ujWt1HdaOWUntPnXRqHtUgfCH05bt7OY0lcQ8XQGrIB1AbGuD2gBZ6SGWnXQjtZ52caGxkhjIfaGEXa7t2NCokG62FJTgc_q7NBLJokQXWiT1m4NJ1tjBiXudzPvi29Z7zDZTJupocZsfPINpoC4v8coIBZ982MiLEq0Kc-Q-hkjDBWHeI-fhrb0f7i7-ReP8kOpjxs_M89B1mcRXowDXCELrJpXsDHLj3V9i7jLCqXYKyZBckknXOx7JuUCJGLbGuXeAVhWeNi3xuhkHxk2hVSz3q9Aj-S6uRwTV97-YxUtmBSqOxx37bJr2Fm-piVQm4Q96N_G4FQLbsUG_deLNb5LsUj9GWYlwfUrquoumZmbWhtpZATRfCXxBPTz_d4A2LTCK',
    description = coalesce(description, null)
  where name = 'Books And Company';
update public.venues set
    phone = '+45 42 53 28 20', website = 'http://braendtkeramik.dk/',
    rating = 4.2,
    reviews_count = 15,
    google_place_id = 'ChIJPyPk0vZNUkYRu47BTRKSO_w', photo_reference = 'AVoNoXRTOjGZ5HnTv7f_JHN96KzjciM5om8S3MkAYpTc6cfnjRDDrbuQE6jHG8H7MyCiSi2CKIqdW0XffnqsuxADF_QLScDT-eCHsPyuAAKtDNCfKB0nvsxHWH9OImrL_VsDF86klE9sMgIBNZw5OYEZHlK27SGdKLmQOas22j83CofDUKk6EaqYtxV-S7bWflC9y1Y7sMblbMifyyqTJxc49WWYRLuGbjkvUmi3wnKt0DJRtBxXe71afYhVIXPJwFUkm6m3UZ_AT-0GyuqY1KqU9GMgz2Yqlonn5bQRyULA88XmKrteXA3xA0T_I94m6yRlAy9e93gVXY-A0dT-yeTikuMda2Tuf-l9qbbC9JpF2H4EWKb5F8j0l2Ec6bwdmcE5jKtvTHWWD5mf0lPfIz5QxWheq9CCgSG-YBGG9bNEUKtaFfx7',
    description = coalesce(description, null)
  where name = 'Brændt';
update public.venues set
    phone = '+45 42 66 99 80', website = 'https://christianiaart.dk/',
    rating = 4.5,
    reviews_count = 248,
    google_place_id = 'ChIJA0P2rDBTUkYRIqms4cUovTE', photo_reference = 'AVoNoXQ7KKPRZw0sU2H7hBTaixE7Wj-ECbwwOOA2jk7qvS8YU8C5MOKZ5XBSJp_4VK7UGEeDsRs2JQuYSUMtq1RjbLm93KaOg2GWV8krTcKNdB0qIJsBUr9R_1ehQz_fERjAvKXaKRy9i7s24DJ-DezGksczweMmSh72aJFvWBYK8FxbdSGivpTrqKvIfhuhvVCYlc7i3K8W_HvCl1Iz5JyOEQ-kqfVbD2uRCo2-zFyYXPIFD0yNLoNfuSGqXPl6fGBZWN-DRf9E0S3NMK0K7_iu2mejA0cWUTq-BVe6yose_T6lo43_P6eSK3VQBSpouISkQdoIiLaslqYFPRegd4nJIMVnmEZzuRLu4WupWF6yaYGYA4kGJOrRLYzeXHfO4cAsm6T2GQbxhosiAYUNMHZfGtO_ApheIranwOyzwzcc568',
    description = coalesce(description, null)
  where name = 'Christiania Art Gallery';
update public.venues set
    phone = '+45 32 96 92 90', website = 'https://ccp.dk/',
    rating = 4.6,
    reviews_count = 502,
    google_place_id = 'ChIJ6bQ62SxTUkYRcz9Kdg-8m1U', photo_reference = 'AVoNoXREKo5UdcJFQUJw-h8H2SprFAyItbtAK9C9ccWn24h5EO2uAXT1aIONmlUHH4bqUXoIE8sdu0J1whNggiIqHpg5t5Wp_c_f0oPrBp8QG6dzB49_E-slwrc5OTtVQQOIKrtoPBu32_aHj3sZ1VUcXdNCnYOpS7nRl4Z7fkWfJpXATe5K3MzyBF-DuPf4WvxMwlRCx2fbf9G6d2Airutt8BuoMMXihwhoRtWoHCjoR4FlFBFxifd0uNpBoYh_oly699HDC8cl0WCjBB6HhGS2QJJZHZQD41rhP8Czg6kVSIs_Vg9NHlKG2I8HLtwKE74XOT9FVyCC9C4Y0EcUGFYm4Vnu06Fdl8hx_5UFTabkQXYzRwfvmdI2xyQwfdJo1-U8CbMBX9s5TCLFaFvfvq73Y9YPJarTuSlhV6P5UNW9dT9c8kdCnP9oUi10tNu0fM-I',
    description = coalesce(description, null)
  where name = 'Copenhagen Cablepark';
update public.venues set
    phone = null, website = 'http://copenhagencontemporary.org/',
    rating = 4.4,
    reviews_count = 2137,
    google_place_id = 'ChIJ_TjiSjtTUkYREOQrVfycMFU', photo_reference = 'AVoNoXR6zv8LBfWDcE27yo2c1Ry1TPgqRjd0UHsP-vCHf6eddrtKv4Qn__GE-2MdeDbd6BqQ3DOA6gm1PDkGcHUT91aW9DBC30vx9yJwrabVXE07U0mYQfHeiWcWNLE5I9peVuU_wfWri_m5tmNLYFmXbEI0rG66CJYfj-fQWNYzjzdPZST7Hhy_c7gJLnBjNBVO4rT__IlJapg6R87gzVDuPCuVu05CUq1vvT73kMfjRs1iP5DpqfIrrZAkIlx1zADU8stHiLPnETh6-aRM51VekdW8zb-wsWeCQByy6DvTBfoG3kkPjF2FIHdsNTdhMNN1YYVoYU793jXZKmpefg4ReuH-Tk0Tm92jEUUXNUO7MXunhP_Ym9SxURdZRpviQ8qurJBhFZhQ5jsTuZVOoq9QyRSdTbJp036Bn1B4ueAoP5he0GnspKG-V2XYkc_Zmw',
    description = coalesce(description, 'Large-scale art & avant-garde installations displayed in a spacious, former welding facility.')
  where name = 'Copenhagen Contemporary';
update public.venues set
    phone = '+45 42 90 91 91', website = 'https://www.escape-cph.dk/',
    rating = 4.7,
    reviews_count = 728,
    google_place_id = 'ChIJI3WZOg9TUkYR1uB15ElMxBo', photo_reference = 'AVoNoXQ1n0Sj6oCqVxJil_sOdQ8lZxaVdRZ8SdnHKFM3OHTuyj5G6ovJ3kup5nDNFnWL-BnvnTAi_iR7njaHn80eo7DzXlQ_OK814vKB4v8yoMl-qrvOQVLWnI3Ci0UI44R7cBJdzNQclwWIZyoJEKilXL9IylHcFkE1cVW2lR1dP3RWiudN-cqVC0QjIAlamGthbeT6wsqDJnAaVg_4dRbNpJ-r_w1MdJj9s4ijpJXdWWSo480zy7EaQbvIXSR66TEjtEZ11Aa0koxuM6A6jhr3fO8e4frlpmxIZNkn6FwD2W4K3bUvTfAUOcJfJdev2uyr-A-7Gs_ZfbUqVB7yzNFc0Z66edYd4Q5kVXz5lqF5scTZbAdBMwThvDdH8RpRZijhnN8iIY8U0Zlsq8m2tL8hPykqWtDPirZZsv5XnpckaS8fan8',
    description = coalesce(description, null)
  where name = 'Escape Copenhagen';
update public.venues set
    phone = '+45 25 17 17 31', website = 'http://kbhtrampolin.dk/',
    rating = 3.5,
    reviews_count = 2,
    google_place_id = 'ChIJc1Tr5VhTUkYR0pgcP_aIotw', photo_reference = 'AVoNoXRkjHjqu95EHdCaarn69NU39dq2DVURkWZ6Zg09dxkIlUbUQ1_NfS4bj_kB_jQwYAS8e5oI4A7XDMxXrGr7YssGkC9LdwrwR8GM5lRzbzTg4wZUPR8nuCwRchHqy_1mBQd62zjiinwFqwkNfvTNEYgFN9-agbyW3AmHGZqJSuagg4n7Ur2PJhVPDG4jjeHr87F42Z7U3kTnFG-kiPYwePSuOZA9Q9IGEkj6r310SS8Y_YV7K5_-NHHV2CZ3GlVX5VekCMC1FbGgClu9M0qAMexfgjHGY1X7zcM_ixkwQhxL69fYd8PNDLIK08-rLEmfEtI2iCAe6K6MLcQBSPnHgxMD3S0DhsCZdjaR7TVhL7CEM693hs7Ve09oYSFNCRhCmj95l5mVnuSepRj9X72EG3tQRp5-4oJwQOUK-SmEeNa7DNs',
    description = coalesce(description, null)
  where name = 'Københavns Trampolinklub';
update public.venues set
    phone = '+45 31 99 99 11', website = 'http://vrlimitless.dk/',
    rating = 4.4,
    reviews_count = 360,
    google_place_id = 'ChIJ06V7-A9TUkYR8GChRe9DiVk', photo_reference = 'AVoNoXTvGho1G7Et7oWYR01u1lA4C3VXl0mVVudk9XPmJ_TVodNyDKkEuU34mJ2pyHvqBuB2vdVhfPPiEpKLQ7kf-941zrBa9n8FLCwiyrs9Ra7n2yRSVFKOXhsEGTpwFCtB4CaPEwyjbP84OnxQUoTV2HmNiiiu-uZ5w2HFA0-1t63O46D1Xac-SQHIGY-dhSjQveaOY7aYbXrItBuYc8Ts0_VoFMRtJBrqQ1fThDyb_kzZWLNQGzofJ5za6v89QETExOUEVFT-C1sXjuy--zmHq-Q_u3Rw-0f5LRMJ7RECroCFTRqnoaHM14kInCha44ZdaKZEjoIOPhWqPsvBYU1dQfVowOq3A6WYRZpKIsHIPgEUeDtNht7rsp0HPP7c2tOOWlpwI-3t8HN_I6FkIwVA9Bd7B0X6QuXwzqZt6Hwb2ouaJ1LRVys_wW_cbs_Do5HK',
    description = coalesce(description, null)
  where name = 'Limitless Virtual Reality';
update public.venues set
    phone = null, website = 'http://mayhemkbh.dk/',
    rating = 4.3,
    reviews_count = 103,
    google_place_id = 'ChIJteHzkVpSUkYRCvYCQ5cZOdM', photo_reference = 'AVoNoXTUGrHQC6gc2TlNk4AcWHqsy0OPOoCFPbhmH66pInxnuKcqSa9FvPkc1b-5-XIZJWNn1AU_23TO0doNpCdmw6Zjs3HyRbsQeJ82lV82KfoRWJluR9eGuLtKTlo87QhEOlK7Fo96nL-2u0CtRsl7XUPTuqq1gi7lfJmuL75wGBwkJaESE776SgM9lt3xqUJGah4sf0dGh-Qmp12ct6sgNPWLNhxPO7GJU6JeXw87a-X0hudP7rT19Y-UqDJ4cGm2wbDODckoznMLZCxETXY2ecEAmDDJGijZla7JU1TtAA-PWBFdXMUb6N4YVMsWIOCr4L3ThOiMxBWX6-IOAe3kxxs4KMg7pzV1mgmhNjDdrxEGP_5XJMTsc1D3OHmaL5gNn5BCX4SMMe0MFV6uqsxwmbUWfgMwmrI1HZXwrnms6DXwKQ',
    description = coalesce(description, null)
  where name = 'Mayhem';
update public.venues set
    phone = '+45 33 15 06 75', website = 'http://www.paludanbogcafe.com/',
    rating = 4.5,
    reviews_count = 6037,
    google_place_id = 'ChIJl5zhPxBTUkYRiFbi-rjg9Nw', photo_reference = 'AVoNoXRh27oS6HmLQqRk4eMdSD_5Nt-PNrfosJI2CtXTBn6KI3VY05c-B5jB67TFTZzBrX51KVhb0JmuoQpiKQrSgGuH-w-CfSFbiO1ckBv1bx5s0RzUP_1wGYTkjaiPzkGv4w5bP4osHZGExDrlQ6L868nPtREGqXhCrDPkZVg-1i67cn-ti7KO1Fs7T1vTTEFuhLJKvBn-YrGcAEgYu01LpZBdz8boGoNE0BCkpnA9V_lMgwjnJAYeeu1QubCTnXZw5kC2EFZTTXY3blasC3GenB-4JIEDJATQGi2ht9ZJnEsVz7hWZVpH4SljqzHw0kNXzHdv_g_qnZzCKB9g70n8fxW5MeC_Su_9Zk9EjTST5nOb1PE-J-caLM9FjZtcZpHeQdthG3MCYdl2kY7pTO6I0SX_tSGA002U8r5V3rO9pRw1p9g615XtGuy8mebg9A',
    description = coalesce(description, 'Old-world bookstore with a relaxed cafe cooking standard fare with organic ingredients.')
  where name = 'Paludan Bogcafe';
update public.venues set
    phone = '+45 82 20 50 87', website = 'https://kulturoe.kk.dk/svanemoellehallen',
    rating = 4.1,
    reviews_count = 370,
    google_place_id = 'ChIJm11npvRSUkYRuOrQeaqGXTk', photo_reference = 'AVoNoXQQ1IgJJSqJ7CENx9iEDxfyRv0VzXIkTDtxlD2RVApQZB2oky_4f1SDDyvpmdNT7HM7YKakGfHa3nHmGjqKkuwq3iVChG7jB2RIElnR1b_hXV1-bttb__brioGoi68OBu2QlZjNljGQKnUCvMZKl7ATwl391KhTZzW2NHwl2dOgVfc2Qti52QbuEn154RBd8dD_uW1zzhArqIWPyzK5rySOcP7d_VZKseDdIvaI2E57B4dTd1MJJ0ATr-Yg8p0zk0yLELy4zimCK5Miu1cL9aVSJ1eB2H4-O_NsKjYObZGvOZE8v9QaBRgkQjuhsdV-y836OaCZzqMN0fuIDl839oGzwLUIriOZA9xuFiMQUYjA70_7G3z2nmYEQCFS_gIsG-AhayOsHAnypH4_YCEyBpZ3PLMJbIKQd3dzWe5FuTNItA',
    description = coalesce(description, null)
  where name = 'Svanemøllehallen';
update public.venues set
    phone = null, website = 'http://woolstock.dk/',
    rating = 4.7,
    reviews_count = 206,
    google_place_id = 'ChIJq4dT_8VTUkYRVfb6qz8VITA', photo_reference = 'AVoNoXSkcIFOZBx4Iq73GeJTR1GFuUJ5Eox4YlNv19N0sG8OrsSewEJ5Z-8qEA-00YGPFODy1vQ1jhUG_8KBOsZY6SP3h0RWOQQAnUwNnNdS-AhIyxd1ukdtoF03wqhBHP2vq5pxaEyAo4qBGgs9DmHtEgP8nwHoE-QA7_4FVvSuP9n1gvX34l9vW2heqWeedyloC5SQ2t7aPfQt-bJwwH-8VDRyotX6RVmoiDkMOnElYsPen8x42iGX11pBHzHaljRWYJAAZLGF7XyVydwx5NYPdYBElXF_nzQt8ld6i98oIsxpe2h_ubfniK6Loi_NyvfMn2KFNbrUlKb5wMh-CM9YyqsPowkQ4P_XpX28TQLBDr2Kevgfz2jGB8QgW8yB46_TUHZgw4eWzh1USYuQxjsxtXddeW9Dofn99sGYcyhyYsjllvQu',
    description = coalesce(description, null)
  where name = 'Woolstock';

select name, rating, reviews_count,
       (phone is not null) as has_phone,
       (website is not null) as has_site,
       (photo_reference is not null) as has_photo,
       (description is not null) as has_text
from public.venues where latitude is not null order by name;
