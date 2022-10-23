import { useEthers } from "@usedapp/core";
import { intervalToDuration } from "date-fns";
import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

function getMerkleTree(): MerkleTree {
  const whitelistedAddresses = [
    "0xfdbefc2f18821a7b566fd9a9530e75543f9e5561",
    "0xc00485651a10881dcdf2b37e906c7ab068b0d6de",
    "0xd8b75ad8d5fc7581dd3a383a1f80f20300968104",
    "0xc88fde95708e417ec5d1c6422cb8db5a3c06bac0",
    "0x76b2ebbb9eacac1376575b4f77d81457b3489fae",
    "0x2af6c93b3262103756b639267e5c66552c03769c",
    "0x691e6af6c68dc72284dd29217613164dc6f3f18e",
    "0x24a666990ef29a2c2eefa92822659c3503db878b",
    "0x3d7e059a0805cee4ead6052725e2738275e873d2",
    "0x5b42a84a52658ad29dc48ec3aa014ea76f1ea136",
    "0xa161f0e1ee72ef12941d9dd6e75fe94c143076b8",
    "0x40f3daf7aee2529d3a4fba5ae85a6674421682e0",
    "0x9fa3c87eb4668984b87e185b24ae08759b0f50bd",
    "0xb98296c9b2d75c6c358cc9367acb4ff433f0a742",
    "0xd5ea6da94a71b52247287dbd985ee3affee40ae5",
    "0xe24a157fc29799a7e3417d27fee4da1f028d132b",
    "0xc52a7b9db11e8d2765ce7babf33e8af7f3628096",
    "0x24db8a0a16da2812b55af4d0f3a8ada8a68a330f",
    "0x76a6d7d4f8509440298182e48af3c38e82d47eed",
    "0x9e165350dafde5fafa5ede15e52eb1a578227264",
    "0x3cf00ce7083958b7b0c1c1ea3a79fddbb03b41a6",
    "0x06699d1d7ff4916dc4ae7e05701109b66b1ba8b7",
    "0x1afa21bef41b61b198b1782d4f806e163c8f291d",
    "0x4a6aa398f119156d2d5c3d47abb038876bd7bc00",
    "0xa15207145c4d7b338f4887808ae56c997e415388",
    "0x495624a0f21833b4b577d0d442b7207419a0f413",
    "0x205b37e83c4538fc9af5b9b63de522e3035e95c5",
    "0xac557e28ef3b7377a141dceb8ae7559e38988316",
    "0xa217621de6ecdfe5b943365620df58fedefa7c7f",
    "0xc2eacfbb2fe0064523758687fe3dde3baa76de4c",
    "0x6c42c30c87081a53abbfcd1d6adfc4816a371f30",
    "0xbaaffc86d1cf8c57ad8b9ec86849ca657d1cdf69",
    "0xd53cca49ea34419f369e84bd0b3372635779711f",
    "0xddf6de3a7ecf342fa3af23a1a796829a5e3afc93",
    "0x5fc2e9c6e1f32fcbfddf5bdcd7cb9af59bdc9b4b",
    "0xec225a1fd31603790f5125ab5621e80d8047e901",
    "0x7fc4caa51e07cc7e25e34314e9881e88616e9e37",
    "0xc154d1b9de7706c8050b60cc561cb5af6f3d1e19",
    "0xf82f6f3af0f77eaef5db016e4b6f25e92e9469e5",
    "0x30ba590fd683c5a52fcf6b9bcf8f76d86a32110a",
    "0xc251c3c6f001cb35561c210ccf1d5ea10f695be1",
    "0x488aa9c4be0770612efb9feb942114a95d8a0a5f",
    "0x80564607da68153e9a48fac8ed21f43de2da7cdf",
    "0x85f40b6f39143efe85c2a9b3b8f2d88a4b83bd6b",
    "0x759e747767b260f4b570261ee06c98e6286dac42",
    "0xe3abe82b7e5fcd6943806cf66fe1b9170e5aad15",
    "0x8b6278f24875641beb51c0028b51e466c53e67f6",
    "0x0c53c7da7e822e64bce38c6b2210801df698b22f",
    "0xfe570e1571cef504b11aa1e4734f87d9aa9474af",
    "0xc4fa5763fa45f7a93222b79f46d6081345396edc",
    "0x063566c74b51f54e3a37f7093b1a8bf823f40d01",
    "0x763e8de9d51b831b8ac753bd27787fcefdf14fca",
    "0x81c20dae3aa6dd92c8557746ad9ff4312f954777",
    "0x11d25bdadb6dc71eebb358743f14856a6dd863cc",
    "0xbea01fcf710f73c6b26cd69fbc2f4356f1ee9a12",
    "0xc2c81e12d164ff0c92bd0521a9108e097b1b429f",
    "0xa13965bc7b8003b4ce744c9aaf1c0dfcd1556da2",
    "0x97c5f210584b1538d4e3aea5f68270bb1138bd7f",
    "0x5614c53a56a0aa7994e0f32563b48a35b8d382c9",
    "0xcfed1304e9d594865e7416bb749d87a56ab13c85",
    "0x1a5ea1deadadea78c999a63536df1327cbfc14d4",
    "0xedc6424a27bbf96b9401fc20d47b4cdf79a1b8fb",
    "0xabba4ab6c2222f886df759d31ef0c17f93279f83",
    "0x424a1088e10e7a1a190005f232bc46f67c63f10c",
    "0x85d2364121e7af980e5050d62498314fffbfae57",
    "0x3bed7992ac45d31bbcd37d2fd793e2229ddd16aa",
    "0x501b235d4d3e148ef1a6564ef4dbc85f8c160bb6",
    "0x6e5c4e6b8c9e9f77ad53edbfbb601a2567764041",
    "0x83df040e2620c378e2da4e0f84fda3789a86cf4f",
    "0x0a0d9ec343ecb184787c571396ccb000cf795f0b",
    "0xb6dfc0ca609823d4a8f74ab3bcf1c2bbf47c0783",
    "0x18fa2563fe28b76436145bfb848d7e4fc85c2a87",
    "0xc87ca6ed6bef6e3ac1693c50befa354beec7f046",
    "0xc2946f834197fbed96a7114e4a46e4500f6cd94e",
    "0x087ed99eebf62c3424b106834bf424d44632dd59",
    "0x0b03a7f0182720639cc4f6fd25bf8e51e543f0b7",
    "0x623be85064b8e3081f40545c1c9adbe1503b45d2",
    "0x1c4b48a5a48a978e621657db5f8f8917942426fb",
    "0xa47b31dbe6004f3a5f8ee35d50efc1d96354c943",
    "0xe48864f7a66aef54a2374b741e4ae6bf20ec715b",
    "0x6ab9ac67e95500c566098a3cd556f67a3dc3608a",
    "0x2b1e3b4d3393b98dde4c23429fca347939c74897",
    "0xc5488672c5b8c8ce50d651ac3f608f1a61539788",
    "0x7672f7ec15cd4e4d921ab814c9fd03ead0acc612",
    "0xae5dd5a2693a5e37e7d55425475beae12e9bb594",
    "0x6044edbab80e4b1c6c26fea1f31ac69fd2847b6f",
    "0x1dbaf7bad18766fb9b04083f2b5e4a442a857ec7",
    "0x69b9c22acffe58bcbbed05c91b4410d3491aa057",
    "0x851ecd11fa2e440982b9f7a4accb84c1439a7818",
    "0xd04f8ab079f4f9e3e5b970a26a8678a126aaf283",
    "0xe7c397f6ed7d3be39024f1e79f6516cf7d8f1d50",
    "0x46b230f9277ea279fbba94824aad9242f95b8182",
    "0xd93f1d7cd6b1b3b8dd0272fc1e793836ab36dddc",
    "0x4c79962bf4e29b3eb55dcb16886b27de5df229c9",
    "0xe6c089b739aa7e84e1d50709392052aecca5d67c",
    "0xf825c91ee69d5d0432bc08b125c6c6be637f4943",
    "0xbabe91412dcd9697f991d0c038f1fd460b260e1a",
    "0xef435ecdf8f55478038fae815861804fb946a160",
    "0x3e2ad16c7b7325193b0dd372045c1893fc1bccea",
    "0x8e7149726dd566cc790fc5bf2fc5ddb4fdb14e26",
    "0xf6a60b7f4b5e9e7a2e3e06cb8a658cc9ea5e78e8",
    "0xbfecb5bd1726afa7095f924374f3ce5d6375f24a",
    "0x495952f6237354134094cd93a9764fe545dbca40",
    "0x6d6978f82906cf7bd0a5f6c7f22911516ff5f381",
    "0xb99fd24297fa2775e5a523812d03d6402cbff813",
    "0x350679cfee755a0fd5d67dee8b2d4dc21fbd7ae7",
    "0x70715011a164fc0b356ed7ffae2ad7d0dd238950",
    "0xb0ba79639a5c735c6f34d4393d0704cd5a3fd090",
    "0xdbec9f8acf7029be79034db7857d1d09c9a6dcd3",
    "0xb7725a31fb93dfb139d6c0d40e17b226ca0a8800",
    "0x38c5dabba599c027dcd0ba168400c8e3ed200962",
    "0xf3da1972ea694ab56d80ad88b7f8a4456caa8196",
    "0x87f68ff0cd91f2e64947454f813c6e804625566e",
    "0xb180b19e228fb1f18b60d290fe9ca0bb75c5a543",
    "0xbb0287fe22870eee2191ebe61ba742f5a6b93a46",
    "0x5914446e411a6e7fba0cae7b3b1367a43d2e09c9",
    "0x7607173cee0e10f0b26409454844b2cdd55145a3",
    "0x48ff5b31006022e2846e3c4f2aebb8a26d3112aa",
    "0x76d0c82d6ebc00f994e16ed8edda8ae6e206e68e",
    "0x7252fdc3c60736962f635dff57607534ff04f3f8",
    "0xe1ece0c0e8fb90325c4aa6dae006f37a721d0ef2",
    "0x302bb37570861d1e519c4d383d988cb6bdfd6a1a",
    "0x4b0dfe7d9f2a839f53e4cfcb7a82c4ad74fb7bd5",
    "0x4682212097da8ea30f0c0c3ea015cd8a399ff3c4",
    "0xbd05895d023da171f185d1da64f2469da83e8922",
    "0x422f9bff43a669e30310e7577773c184523adbc0",
    "0x99bfb0d876ab1dafd6d0a2b7c25e3e86ffaad4df",
    "0x47a277b70d2d6970fcdf3ccfccd6819cb2956764",
    "0x93ec6448bc89b871492b0fac1b7e57a581f6428c",
    "0x559c1eb7cc91ac594905d7cff91dd15552773fb5",
    "0x8389f6b566eef7bb27d67a636d2f3709112d8b32",
    "0xac57ac75ed0f1db4c66ac7f6d401207f8102f539",
    "0x0b7a49d4afbc3e1ff0ecd10874e341c46dc8c612",
    "0xe07770dcf6f2d2e8ef279e9698bfea4392d57f46",
    "0xd88b2b20bd378a9e9d209bcce52bc614f3824858",
    "0x541da271df32cc747ab49cf84e6d417c0e67eb5b",
    "0x12da352013d356e2be5ff8e4d2f9e1a74bff0fb2",
    "0x7298e73dd65837fee3cdee949c8462036be63046",
    "0x95e5d9cb7f6dedd614e85adf9175505a4145496c",
    "0x0136e0629649b53ae7496c63214389090cd47c83",
    "0x1b44720a9568cfd9262213be1f904001040d5970",
    "0xd22efc1e2297a9354984eb21cab15dcdda7bd5b6",
    "0xaa9c05df4d0aad11fc864bcadd89b56b9c5e5264",
    "0x7a353e35a084e75e220a2e02777cf7266eabc14a",
    "0x171e4ba340e485536e6426db095ad78b63f9e137",
    "0x9807ececa310e31ba8e71316432fe4836b45da32",
    "0x9beba0d0f2cb869984fda0549c626223743fe591",
    "0x08c91628cd16918ce969fc451f82d5c27417b84d",
    "0x7328544462a37ab18006d2b8c2d37ac28d1855ce",
    "0xb5876d83605ab7220d68fff82e61acd55d2b84f5",
    "0x8e993c84e35f4f4fad262b6190d96e1d6242bb47",
    "0xeb9cd476339c7221f2a507d746dc02622eaa65e5",
    "0xf5dbb50b29f3c04d2ebd6ad08cce0fe32cef494e",
    "0x5a1f0d9d17c0b0165c852e67c2c0bc81fd350e7b",
    "0x540bbf6a9e195398802f42552b3089dee5d7af60",
    "0x43af0dbf39acca150f2c0541dd13e13ef69165b1",
    "0xb75e827aaf5c204f1e375b0d52e4a6d1ba0b94e5",
    "0x97c8becdb6bdb1bfc0a789cc240f0e126c9a3feb",
    "0x0be848e6db55564b186c6373e781c6a141eef067",
    "0x5ec62034dd3b198763c72e5ae775fad3990973b3",
    "0xe995481494695359e4726f9083edabfbd678fb64",
    "0x1ea2246dc2266351a9e83a2cfa8c62068ea88f20",
    "0x9b9cc63626692b73b65b315cb586a7b543d3391f",
    "0x155156ef2dec49c13294b9537554c5fb79a1a49c",
    "0x137e37b8e606fe13038d152a9ddc84ccddfa768a",
    "0x703c68c648a9a94510f0c0fa4d0130ff3fd3d0b2",
    "0x75c4b4fca59c79528318ec5ed04a94676fb17ecf",
    "0x1d197a512b33f26dabaff498769bbd5a37df13b6",
    "0x3bb1aa2d2dba256fed955bd922e03b4f35c4d64f",
    "0x369dec5c1150ec41896776b1a60efd1e0bd94b20",
    "0xfa7c72e3a3fd54f26becaaf8f1d0d8815f29570d",
    "0x1c69a22e709d7aff8c0220abaf9061b4b35abcbd",
    "0xaad6455b62716306f1fdddd3032da1942acd7d03",
    "0x4ec2d22c17667997051e67f2cc7ee38368b3a237",
    "0x4e0339e9cae50e4322d851d5de73175dfccf0b2b",
    "0xf215daa3980370ff97572cf8ef81b81ed6a8138e",
    "0x9f625edac04319c7ff01cb14cdb474722239f956",
    "0x4c04a1a05b761fe3472ba0c3480494cecdf0bbb7",
    "0xf80aa50b2087adfef4089efb12500784e40bf29d",
    "0x2dec75aa6f7e05de1e1b2e8d1a85f79aefc17d06",
    "0x26852f5184f188e9f0c4551fdd25c37391c10bad",
    "0xb51667ddaffdbe32e676704a0ca280ea19eb342b",
    "0xcc9da72a418e981074d6a00c328000413386fddc",
    "0x9d77dec4083fa8567b6c1f17d986de9665954d5c",
    "0xc802720d71e7e2433a26d887e5b37d183ccabab1",
    "0x5205e94e352fd094385a347cb71cee90fbcad2f2",
    "0xfa2a56c6cfa68deea34f2640b259036fe824a2e9",
    "0x8a5af0cae881c76c57e877d35088539751cd6770",
    "0x431a1e426bbc69b3a7c0dcbecd51aae1deb7f9b7",
    "0xd81cfebdd4a1952b573bead1b06932a3261683d5",
    "0x4242c10bd7d435bb262cc1253d86272cabfb0283",
    "0x42409aeb4f436aaefbc6b542bde5081c46653499",
    "0xc77ec27e6ae82ead54894dffc7d3f3fe3a09246c",
    "0xc908ebd8d0c40546e8e3ca3f3a80dbc1e8fa01e5",
    "0x5729d1bf99ce6ebf6f059d431df56cf900971af5",
    "0x9bc40a1d8d6c73f30cbe912808c15c1d1a5ebf9e",
    "0x01794c5ac48beb01596e4126e52bbda39d759728",
    "0xd1842d4a0fddb7ff4c66999fe72bdfd629a16de5",
    "0x17e7c2b65dfa261f0f8fc081cc3a5e59c7688e99",
    "0x335a3ba013c75855e6a536deb0ec8cc35116f97f",
    "0xc7d21a6a1174fd3fa1e24b1bf2cfa1ee7b7faa40",
    "0xbcb6275ec72c850b0c16f1b1d0a61caaeaa63dea",
    "0x017ef327bea9aed5580a82eb6e84eafe17a581c1",
    "0x752fa074fa3c4978778f734eb5ead33e3e66c70e",
    "0x5f2ebd6db31908ec48bac2f5da5a0487e3ca9b97",
    "0xaee8646bd065f95d6fc848228db07980701c8e8b",
    "0x1f82fd59071aa58e03800bd586e6d2f9cd5fe325",
    "0x2ac151bb889bca4354e3727b1c356654b8c12469",
    "0xfa95cca375dadf1649b9dcf1787f8978c9bd7370",
    "0xef75956f9cf3e8fa8ab972c8387d84f0244831f1",
    "0x88d056bd8bcd053d52162187d65d4af998490b1e",
    "0x21c6babb004e9aaa33d368ba227602686defed3c",
    "0x936b72b9a3489ec003bd037f45c9fb2743b61a03",
    "0x78c4fb4729026ded25046a7030c8e4c2f6d2031f",
    "0xaed072bbd1e541102ad6173352cd72dbb71147d4",
    "0x35f8fa458fe42dfddf712f22c6ae91e3ebfccc25",
    "0xcd3125ee820f47759bf2e151546b664cd597c329",
    "0xca28058bacd0c5bc67e082932da9ba0173725ac8",
    "0xbdce5bb27c93f70cafa9f260a250dd10cae5bf6e",
    "0x73786874d6062be2ae565571177e3524ba03c6f7",
    "0x7107ba1617b1445dedd1ab95593c1bbe74551330",
    "0x85ad8b024488d83f2eeef58a0c92a9176b7da2e5",
    "0x60b6598823659f6cd452aeafa937cd0fcc38c74c",
    "0x7303a8012e80d9b1c7725d1ecce0885ed222bd0e",
    "0xcb0e27186c972bec823ad098f97519bc9570b498",
    "0xa9dc5fdf7b42b92491851152a5d20a1120de9d1f",
    "0xc1d217989565ecdc634af32193e951b4e8490998",
    "0xced58886dedd2bdb5961e4ed2047b36ebb8c218b",
    "0x13dc1651e4109e4a50d66bb558aff988c2345d9e",
    "0xb33fb83c645ac2a12b138636fe59604312092484",
    "0xc2447164fcd983b0ed867ea88133943af9815e61",
    "0x2633a6621e40d78972b735308d7d99f9516485b2",
    "0xdfdcff60641a499a2a5b85e3f9fab67c01b4bbab",
    "0x1be5836ec86cbf06b37868235850cf4dd5aabe7b",
    "0x6c7b672be5da5dd0154c35e41876998ef9786870",
    "0xa462149283fd9c700fc9fce47f3dc29609e59124",
    "0x8d1395fa52cabecf9b438b554ad369ad710dee03",
    "0x75d43760e8993fdb89faf6c630e16d59a83c0d72",
    "0x21f15d4349149b92a9e5dcf1da8d17d2e0753591",
    "0x5f6d3d4f90ab31064e90046745f72e89eb38ff79",
    "0x7ddb7205dfe81d1cfe4c48c2274b44991b6f4494",
    "0x351afd0681282ad0f9ef609acfa1ec2418082036",
    "0x6cf468dfbc51ff2f920216fbdea3876a9450029d",
    "0x7d692c1cc7ff54e2067a774b43cdc2cf501c294e",
    "0x1524c08fa368f2d6217013a3c270659934f24384",
    "0x7ea4bc27542ec86712b29db589a08e2a7210a004",
    "0x8b21c0d71ba24cca1fabaa8da069089fc72da381",
    "0x00b72497836e5984527119cdc60d5b8115e5c5e9",
    "0x184c6ce7e37deb40425435c1f7388b91a3bc34fa",
    "0x461eeea078c7bbbd581f0cae7d9f3a70b2576fb9",
    "0x5d2ffd8323143eb2396f14614cfc2edce9db0611",
    "0xd9bc2976ddc0f5e16f145906456cd881b71eec0f",
    "0x38f87d634f232368e978113ba3ba9f50af0bc619",
    "0xae29e0f26adae2b0e72613e16b9522af33fd88c3",
    "0x253f048e169625fdaddcb0285423384f28ea71a9",
    "0x2954f7444582b3446d45d3da93e1831b882e8bcc",
    "0xbb8b5c4413e733d01cad715f7fcbfa535ca00f1c",
    "0xcb1257e4f2efd5ddab72a57e76a0bdd68211c1e7",
    "0xde7a619b032a3eeba16f6e20b4440320dd02b437",
    "0x00285086d8dac2361eb3d3a9a98f689879e454c8",
    "0xcf6069c99108b45c094d65e5016537fdc1bf6c14",
    "0x453bae9d628e05078cb194be4c16270b279306b2",
    "0x5fb0231244f8e8d851329ac7bea1b74f6e4b4c1f",
    "0xb82044882c713c3b5a135eaed1e745fa14ba61a8",
    "0xf1cab5e2fa0a539a06db5f62a0b03e4120193c9e",
    "0x57a6825a072969e9082a56cfa6b0db840f79653c",
    "0x2c654d5083671326673819c8a5a5816c4845d90b",
    "0xebdff89f1e1ee0489a1b1b5d224863128b4b16b8",
    "0xc00825acdb6fdd60dd94685ba8d40a3bf692c902",
    "0x0eac4689ec832305fc60d3eda84f90ce065bf612",
    "0x1b2f5f7756c8ea39e2e136da2250b39abb0f0e4b",
    "0x58f531c2ab1ee5e74469c567593b3a492a620cf8",
    "0x0d9720d462decc28c46c0db20d100cc824f6aa96",
    "0xbaabe13864bed38d66e1a10316dc5b1878dec48f",
    "0x05a8db73fa0eef886976c52e03e043d5a21fd2b0",
    "0x65a5c177cbc0a3b119c980bb643e0f28b73f49b3",
    "0x6c721ed35f3d11a22d51f0dcc8758045c32ebb81",
    "0xfd4640d4fb229bd607df0b53d59075160deddb4e",
    "0xfe077390e785fb9d31bf1f7c0daaf44e22959e6e",
    "0x5ea53576ec7916c1d4f633ae35e9aba3fc37305f",
    "0xc646cb51295519a2a16b736e0ef4efb3b2363a8a",
    "0x62de6a6409ae0127a8eee69f19aac360b3375589",
    "0x483d98b4f0ad0abbe910ea1605eda41b01a6c5b6",
    "0xa7763cc0694d056f04359d13f64bec5f6745d092",
    "0x12fb886a3776f6b04fc0b27346f55a89f4918a06",
    "0x0ad5f42c44cb1e8afaa116e963096de97bc7482e",
    "0xaf4cdbbd068cb781b26a587e98616c90017b1054",
    "0xc3689b375a6371939c4a70747aea75676d5ef074",
    "0xda1575d696d922f3c86c92f2b4f8bc6add27024d",
    "0xb3fc311bcb607a29bfc3443865c99ae891b29455",
    "0xa6db9d5977de9bad6d8a8edd0309ea883ded14a7",
    "0xcee867a56ba6edc34af270329c58708799ca9e8b",
    "0xabbff35e351b3d3f40a84f8a09b19549bb063f10",
    "0x04c0e2d370984c67f8149e034d81341ef46f8205",
    "0x6ed96409f21f3305c8378b9e93c17ed13c9ea7cc",
    "0x4cf7f1bf823e0bd810a2dddb24ff35d7acc86232",
    "0x5a4f386df708a687ab8380c4898a6c351e5c95ff",
    "0xf367236d56338ac780267ac09217b02746607cae",
    "0xa6089d352d35eea3d8a747ed5269f2ecad5fd030",
    "0x2dd39e9c19aa8dc6abf63a3d74732d2aee650061",
    "0x8bdfa359be493618fdf7e653d0a76e931bab0089",
    "0x25ea7f96e115660a90dd42eb78dac595f79363a3",
    "0x54bf5e37904c797b4cf42c48cfbdeb903cef8a3c",
    "0xbc1f10bdea37a0967eddfd0412386ed90bdf64ed",
    "0xb4da32e31c3090ba132c08224f5c0fe82a27959f",
    "0xc5286a6f0d907a34b8ce58c6dca5040559447150",
    "0x5ed4eb8b681ad94415be710a2b0f9d30ae772184",
    "0xfde5356e4ba7ac31705157ce66dd50fa35f3a83e",
    "0xcd30a858be430103e1764d5dfb0b3ee89763b0cf",
    "0x8e238be384720bc7a9f191111b34761dd457001a",
    "0x387fe86d6abfdc8c2c3a01fef3e6f8019cbffdf2",
    "0x9b6c5589bed6ac341b1648d375cf8c628a464ed1",
    "0x4fda7653a31714defa7d87bd4ae7c0f98ef29a8f",
    "0xf666ae29018c59012da588b88c6f2ebb40868957",
    "0x6110f9f4a64bc2dcd3a099199f64d9b58852625f",
    "0x7e0c71c98cf68cd471fa58d26ea8b5c99f7a2bfa",
    "0x5c7850864dd1bc32afc3ae2e6fcc1d25f49c73b4",
    "0x59bf3648f3cd1d40cfde2427f80e8930884ef589",
    "0x37285aa7c4fa1c2460c383a0cc0708ef8141c0f9",
    "0xee97cbf18fc41c068eb8afe67025353346c5fa02",
    "0x1674d6af75afd9f18d0fc3a82d668514e044ee13",
    "0xc1a4ab34949745e470ca41c58e2d76305e83b83c",
    "0x02221a91a389d4dfeffe9756ad02f1da4872269f",
    "0xfb285a8189a322a668f3eae223560e6cd63e422c",
    "0xc24ccad052c632149f817676c89751a8c57fa779",
    "0x55d83306f7c02b4247a542a79e29a73ada9bb199",
    "0xd1098f873447a3079f87a1739823821d3e1ef95d",
    "0x325871d0ef3f27c4f837c4714ae5c2ba5b543425",
    "0x6fc249bccbf874c718aa19589bd039962b8c5f0f",
    "0xba8f4a85d447b2057d0e58d9068a56891fde29b6",
    "0xf40e6ae609afb91b82b9864d20fd337e9e7d3c2a",
    "0xb647a968616cede5c5fe462c46019a3369abf88f",
    "0xb7160b7991529bc06806e603045760aba6d980b0",
    "0x0953678ac2ee8571486ca9f94d3306d403cc76c0",
    "0x96f896dc6121f52fdf74ce1d56c89cbdfe0bf4a6",
    "0xcb58dc38b09c85397ca201065f98e10c51f584c6",
    "0x5f62dbf9422dcbb460258b4109b5dbe2071855da",
    "0xfb150cc9f95b900b7d947d5f7b6fc8adb0f8fa0c",
    "0xd6b2631aae958bb91d9d3002a462e15d9b32fed5",
    "0x151cedf802c43bf45bcabb9de084d4cd90b6c07b",
    "0x09f085c87d7f2f811915169901b9b209d0c3d496",
    "0x6ca1c0b49cfb3737b6561bf97ed834971da3307e",
    "0x96781248a3c8a31c6e81ba3d7d7b87907781f1ad",
    "0xd0e466f75e407eee4999cae024e127354470239e",
    "0x06fd644aa2e5d6480970fc6e5abdb4b6148da93c",
    "0x5b170346777ac7a0bb20cc85c17d4ada144309e0",
    "0x4f307c9d180cad9712aadbeddb4c7bee031c2b13",
    "0xa6406b8993e7f48f99eeba2948a2ea06918bc7ae",
    "0x3e1fd789d0e7dd2f4e2c6f779f64376490b9ceac",
    "0x530ef0ff647815a05b0b13c9c8ce6405199d6a70",
    "0x9fec9c3b627bd340b7212a624c5cb4207543d5b1",
    "0x87fe8994f53910da1c8e7da9366c484bdda9ec13",
    "0x51dc4aaf1d6ae56ba5cc03bc4bb5010fab11341a",
    "0x549e7d17bace6aca065b3b308c1dbeba44e05b56",
    "0xd18a67f82bf9289cfa8067852026c1f93126f502",
    "0xb9909d4924b73ef7cb6b83e4a311df116dfc9c80",
    "0x95eca88989948cf0273e97c208ed430490ca17b6",
    "0x56689c0203157ce63ecb3c67a5ba298aeeb44098",
    "0x3630b65815634f7cd92e79e21b1914c8fe65138f",
    "0x3cfe2e03954c65d9f6db6977e0c0543ed97db8a7",
    "0xab2ab1f3bb0f4ff833c2a589bfb45484f6920c52",
    "0x669964af58ed1ff84f3b7b794ae113e2c952bfa3",
    "0x0479a1285f699ca0bc21b43f540ca45eda63a9bf",
    "0x3adf414410b4f1b729bf01187b1a29dfd6e9bef0",
    "0x27918e02e98ca1ce08e061eabd6ce3c107c1fbf7",
    "0x088b59e2b3eb9175c876117df2641129c9ee9fe3",
    "0x2f50397dacb1d7524459e77c5b559965ca10d846",
    "0x05fb43f0028b1b57bb9cfe2df76b26175d08b0fc",
    "0x53bca1206d639c71a9443b9fef5344bc01400de6",
    "0x5e90726d809fdace50573180090760db78b87ed4",
    "0xc4726cdb6592693627b30493a48231bbf67bdb3e",
    "0x2504e3622346cd2ece5850e35fbc755dd2f8f2a5",
    "0xa83c79c932cb02f1a88f3d3ea2a3d87f4de0b51f",
    "0xf9c909deb9cd08dd31819fcf30001d8cb2e5da27",
    "0x94e94bcc8f0b9d66c499516f0f440750e5b0fbd9",
    "0x56b1a217b683fabe91407b929dc8662dacd5d050",
    "0xff38411246678843dad070c904ea664714ed210d",
    "0x2c006c818c627997ff2b26cd938948642be53cf8",
    "0x21a6bf9857a8874b34ec148969e29c70c3d2130b",
    "0x9d8c44d7ca9f8ec7997aa5dfe970d5eaa0db0213",
    "0xaf94c84dd8addbc22565c0cd5abe232e99b97c72",
    "0x702cbad0f319d5a6f3b21f998c416f024717a9ba",
    "0xa8090f22fbf2319acdbc079b75b7e54686e0d054",
    "0x8e3325f9573c9af44fd1a523cca0e914af87a6f3",
    "0x9cae126cd3f826d8caafd4731cb718fe27e01ca2",
    "0xf3b46ccc690b589ce4e544ef3bc4e8602fac2312",
    "0xa50f901a43865e3f467cb874ca28b75b8884f18d",
    "0x53981dd404485ab91b52ad9cf17ae6f276413e75",
    "0xf52b81ab225102740b7c013c8cb3a579bc2bcbe2",
    "0xb9112fbcfcf093e5cd6617b9b8275c2a7046a4a3",
    "0xb56e077b308778e765113da0435625df7f7e1dee",
    "0x47d55dd42fadd3d0850954a48586026b0141b8e0",
    "0x70b88b5b66b260cf01aaa72bbbcd9c13a6b6c0eb",
    "0xa120ad203c1f5c7854012a93b216f83e6aa3437c",
    "0xa9bbe4609d81b8b43960f4c4ac2ade7de51db8a4",
    "0x8f02512e87b7fcb421676cfd9fbb8bd54214d734",
    "0xcddc46405c6db56566b088e308a157ba3bcf0b4e",
    "0x9e0568b7d69d3406ed106fda7c5c6f89e0fc5f90",
    "0x410986e045227f31dc3439a23539e37c712fb25e",
    "0x31f7c1b26176de25ab54f442b3c1278f27524570",
    "0xec9dcc92b13a45e66a1b97428a172a66a74161e9",
    "0x4ca19be8160cdb78176c89204402888a553bc83a",
    "0xe48534fd738abb9940c0630f39c667fab1d317af",
    "0x7e92f026a320ce667d8fae9f42517d535d3c1efd",
    "0xbceaafbb0dabd7c767f6680ac12e85e14e46b40a",
    "0xa063e93ca979f2da2322e709ed4d2b4dd0c1e101",
    "0xd4395c7c9640e5d2179b12c8915404ad1368869a",
    "0x10e5fdfc4f07b9747a99aa2aa0e154011c84a9c2",
    "0xd0c7c30a8f963c8ac7f837cb66b6a71602502b8a",
    "0xc2b2568982707e9691dce7bb23501071bc06f415",
    "0xa7e016cb0743703e81a398be13cf1a2be075dc29",
    "0xcc0fe514a11bfa77f855da3d6cfc3cf91fbfabfa",
    "0xa46e81b8c55bee5248721767d195a76d6aab43b8",
    "0x0ded488c1ccaa2a8bf3193968692bb5446250f1f",
    "0x7b80ca9043e08bdc55e846fc0320f2477efefde7",
    "0x14733e66167e83b6c8bb04a17ce2a8bf6fabf7e6",
    "0xda6e588a6ea2fe053607e26e115cab756191de57",
    "0x5f23e63f22187af68b03ecdc166e6af86d002618",
    "0xba242b044dd28f216d18a78478f5ed501f8702f2",
    "0x88077ed55c1496da81ef965ffa846403c58b207f",
    "0x4daac651c4e7af29dbc494fb7fea2bd68bbf0f0b",
    "0xede5ae6f5eba4e8fe26c009c65bed3893e05d0a8",
    "0xd51f735949a0c962ec195b3c38ad094e5573124c",
    "0x8dae9e9a3109bfcc599a5db642fd916a780b4f18",
    "0x962271f125bf3ddda35b2c92c141bb059e79cefd",
    "0x78b766de19f43b6cf12f04106b24f23ef37b766f",
    "0x0eca4897a897d9f3d0742a3a645ced3a7db74880",
    "0xa631e18e239013b8adf15df621b0d9e7cf5c851c",
    "0x953a6f2527a9152598d820e2b857a33d1505e0e6",
    "0xf4ed8c72581b9c3c3aeee616e1c6a9508decb29b",
    "0x6e43e987f92f320a78b97969315c0c3bbf9f383f",
    "0x4d3c6ee44d9d7e5fbc3a3257264b322941f0d8ad",
    "0x5ee6085b4ea73f13af82983cf6d86b71b17ddac5",
    "0xb1d8620424a1f4cd75f140155f8dc6ae740f3426",
    "0xc003908ade7b13f47670c17470f8f35df1d06bfb",
    "0xcc0d48e33c3af72c069c314d9d5d79bdbf5ae6e5",
    "0x77acc6f3d44110db7f3f9b99cfd48c3c14dadb62",
    "0x0a59973e5339023c6581889b50bed93c7408f7ed",
    "0x0fec5b00e1804bdce0fd026010932d5861144969",
    "0xdb09b59c3c3b28114c6a1f1fcf5028018815b263",
    "0xb4c8eb874707b0cc63df7ee68ef62bb17096c7ae",
    "0x689d42c839db5bea9d95f8a561231cb6c7cbbbfb",
    "0x7aab069e8e1f5fa784fa98f0c5a1db54393bfc3a",
    "0x9848c3ba03c6d576374e8929f544b83a2a8513df",
    "0x2e00942a5fe98211a1a15a9ff6c292a563964bb7",
    "0x09b76d0ea1a2585e57c73dbcde35bb6a0c57eb34",
    "0x4e5dae8c0daf6d3a452673897408c03813e63849",
    "0xb916493278a9fa3d5ef0bd354a8fed275231c32b",
    "0xdc6e4b60bb7ab5f287075a5c9521c5182dad81b9",
    "0x6c8ab70c6b822048c5f71b4ae59d3fc94c868204",
    "0xb084f1f139c3a477e22a884be8b349aa6b2b73e6",
    "0xbd609936ac671715d01d12cb3075221038f61efa",
    "0xdadc7abff713213f21129688d5f9d672bd0dbd93",
    "0xc7a5e78ff074377092eb45befa2f6e22b271d52b",
    "0x79e7f2ca47600477e6cb401e2f5386587e2a033b",
    "0x31fc0277931b35ef80527267aedd31609c490c7f",
    "0xf077ad31a7b47b7248fc8cc102f2cbcdb42560d2",
    "0xfa1bec96d2f6be05645e68df0ba98f1b089865c1",
    "0x1b9cadfcc98a52904fda06dcf121ef3e2c61030e",
    "0x0ff1e9daddf85c4d575944bb430a7a77b906e52b",
    "0x7e5edf76e2254d35f0327953aae62d284d204949",
    "0x077718663a5fc16eff8245305224fa4bf91e3ee3",
    "0x4b192fd6aea476531d9465c8d05a30addf1cdc9c",
    "0x1aa4e5d423186a6099b6d5a02857400b39871c35",
    "0x61e480a6f2f539c5c8b71894293b00818b2d6e73",
    "0x33be249b512dcb6d2fc7586047ab0220397af2d3",
    "0x311548ee8498386f03fb20ffceaad0b7fffae4f0",
    "0x0556904c57ef2187e66a4c593f19dd985f67e017",
    "0xeec71187b4a77f62a69f9589db3a3a1375f9ee69",
    "0xd1db5e7ebaf371fb103d467a4865e80423887c7d",
    "0x1e8488567d670242844d1bb0937e9283cb564204",
    "0xb47c91f55896fe899393f9a7ecfd6a4426bb0abf",
    "0x88a848892fc936b2cf73ce3f29e24607cd3c8f6b",
    "0x971358d7c109dc66d646cfb9f20642d5f37e1b59",
    "0x43d018c74eeab4ed68b6f32ee82ff1939cff236b",
    "0xa41dcee235f7f8ab2c7d8a3e36fdc63704c142ae",
    "0x26e40cb4200df01326d73b1d7200ac944a6435f5",
    "0x98f4b2437059401af712bcbb7f56ec5ca66f2b35",
    "0x67593a4f0c1e290eae66459ee160a82945a5886f",
    "0x2d9d63433f43a8c55442619e810e1b34cfef8504",
    "0x382c6f4dd388a71458aaefa837b385ac6c33ddf0",
    "0xce447d814fea1c83d30c1b1a61d5b248adf58ece",
    "0x70e60030afe6b0a958e34931dfceb73e80ea5828",
    "0xcd528ca3689f0f80bd3d45a4a438253b824ab8d7",
    "0x0fa86a9c57ec1c5d269d79d571e96eeb3561353d",
    "0x2b2a9cd8bceaf092552bad89e19901caad9dd2cf",
    "0xbdb67f6f9e65a24573ae00b512c67c0472a3747c",
    "0x535950cfd696ff3e168324c423d3527304955621",
    "0x82a3f2b08af847e511ded5e509c1ea27b5764c9b",
    "0x07efa31476e09920eb7e8df870af6fb9974a35fa",
    "0xa041e8fcfeb517d9682807b5c7822655e6d3da20",
    "0x83542d6e397426cef14d6e48c230b49386e9817b",
    "0xe8c17c78934f8918468742b07ac27adbe3132eed",
    "0xf5ae2f2910a35432257405c8ac761d34943ceff2",
  ];
  const leafNodes = whitelistedAddresses.map((addr) => keccak256(addr));
  return new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
  });
}

function getMerkleProof(addr: string): string[] {
  return getMerkleTree().getHexProof(keccak256(addr));
}

const TimeSlot = ({ unit, amount }: { unit: string; amount?: number }) => {
  return (
    <div className="text-center min-w-20">
      <div className="font-black text-8xl md:text-6xl">{amount}</div>
      <div className="uppercase text-2xl md:text-lg">{unit}</div>
    </div>
  );
};

const Mint: NextPage = () => {
  const { account } = useEthers();
  const [agreed, setAgreed] = useState(false);
  const [whitelisted, setWhitelisted] = useState<boolean | null>(null);
  const [mintDuration, setMintDuration] = useState<Duration>();
  const [onlyWhitelisted, setOnlyWhitelisted] = useState(true);

  useEffect(() => {
    if (account) {
      const proof = getMerkleProof(account);
      const merkleTree = getMerkleTree();
      setWhitelisted(
        merkleTree.verify(proof, keccak256(account), merkleTree.getHexRoot())
      );
    }
  }, [account]);

  useEffect(() => {
    const setDuration = () => {
      const d = intervalToDuration({
        start: new Date(),
        end: new Date("2022-10-26T20:20:00"),
      });

      setMintDuration(d);
    };
    setDuration();
    const intervalId = setInterval(() => {
      setDuration();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto relative">
          <Image
            src="/images/bears.gif"
            width={300}
            height={300}
            alt="bears preview"
          />
        </div>
        <Heading>Minting:</Heading>
        <div className="-mt-12 md:-mt-8 scale-50 gap-12 md:scale-100 flex">
          <TimeSlot unit="days" amount={mintDuration?.days} />
          <TimeSlot unit="hours" amount={mintDuration?.hours} />
          <TimeSlot unit="minutes" amount={mintDuration?.minutes} />
          <TimeSlot unit="seconds" amount={mintDuration?.seconds} />
        </div>
        <div className="md:mt-8 flex flex-col w-[75%] lg:w-1/4 gap-4 justify-between items-center text-center">
          {whitelisted === null ? (
            <p>
              Check if you&apos;re whitelisted by connecting your MetaMask
              wallet
            </p>
          ) : whitelisted === false ? (
            <p>You are not whitelisted</p>
          ) : (
            <p>You have been whitelisted!</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div>
            <Checkbox
              checked={agreed}
              onChange={() => setAgreed((prev) => !prev)}
              label={
                <span>
                  Check to agree to the <Link href="">Terms of Service</Link>{" "}
                  and <Link href="">Privacy Policy</Link>
                </span>
              }
            />
          </div>
          {!agreed && (
            <div>
              You must {onlyWhitelisted && "be whitelisted and "}agree to the
              Terms of Service and Privacy Policy to mint
            </div>
          )}
          <Button disabled={!agreed || whitelisted !== true}>Mint</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
