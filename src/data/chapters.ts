import { ChapterLevel, Badge } from '../types';

export const CHAPTERS_DATA: ChapterLevel[] = [
  {
    id: 1,
    chapterNumber: 1,
    title: 'Bab 1: Mengenal Jenis Sumber Daya Alam',
    mountainName: 'Gunung Rimba Hijau',
    subtitle: 'Ekspedisi SDA Hayati & Non-Hayati',
    description: 'Jelajahi lereng hutan nusantara untuk membedakan sumber daya alam yang berasal dari makhluk hidup (hayati) dan benda mati (non-hayati).',
    iconName: 'Trees',
    accentColor: 'emerald',
    mountainMaxAltitude: 2450,
    requiredPointsToUnlock: 0, // Unlocked by default
    questions: [
      {
        id: 'q1-1',
        posNumber: 1,
        posName: 'Pos 1: Kaki Hutan Pinus',
        altitudeMdpl: 550,
        text: 'Segala kekayaan alam yang ada di bumi dan dapat dimanfaatkan manusia untuk memenuhi kebutuhan hidupnya disebut...',
        questionType: 'multiple_choice',
        options: [
          'Sumber Daya Alam (SDA)',
          'Sumber Daya Manusia (SDM)',
          'Kekayaan Buatan Pabrik',
          'Barang Tambang Sintetis'
        ],
        correctAnswer: 0,
        explanation: 'Sumber Daya Alam (SDA) adalah semua kekayaan alam yang berasal dari bumi, air, dan udara yang dapat digunakan manusia untuk bertahan hidup.',
        funFact: 'Indonesia adalah salah satu negara dengan kekayaan alam megabiodiversitas terbesar di dunia!',
        basePoints: 100,
        illustrationType: 'forest',
        challenge: {
          type: 'fast_time',
          title: '⚡ Tantangan Kilat Pendaki',
          description: 'Jawab dengan tepat dalam waktu kurang dari 15 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 15
        }
      },
      {
        id: 'q1-2',
        posNumber: 2,
        posName: 'Pos 2: Lembah Aliran Sungai',
        altitudeMdpl: 1050,
        text: 'Manakah dari kelompok berikut ini yang semuanya tergolong Sumber Daya Alam Hayati (Biotik)?',
        questionType: 'multiple_choice',
        options: [
          'Air terjun, batu kali, dan sinar matahari',
          'Padi sawah, sapi perah, dan kayu jati',
          'Minyak tanah, udara bersih, dan tanah liat',
          'Batu bara, tembaga, dan emas murni'
        ],
        correctAnswer: 1,
        explanation: 'SDA Hayati (biotik) berasal dari makhluk hidup, yaitu tumbuhan (flora) seperti padi dan jati, serta hewan (fauna) seperti sapi.',
        funFact: 'Hutan tropis Indonesia menyimpan lebih dari 25.000 jenis tumbuhan berbunga!',
        basePoints: 100,
        illustrationType: 'plant',
        challenge: {
          type: 'detective',
          title: '🔍 Tantangan Detektif Flora Fauna',
          description: 'Teliti kata kunci "Makhluk Hidup" untuk meraih poin maksimal!',
          bonusPoints: 60
        }
      },
      {
        id: 'q1-3',
        posNumber: 3,
        posName: 'Pos 3: Bukit Angin Sejuk',
        altitudeMdpl: 1550,
        text: 'Sinar matahari, angin yang bertiup, air hujan, dan tanah subur merupakan contoh Sumber Daya Alam...',
        questionType: 'multiple_choice',
        options: [
          'Hayati (Biotik)',
          'Non-Hayati (Abiotik)',
          'Hasil Rekayasa Manusia',
          'Tambang Tersembunyi'
        ],
        correctAnswer: 1,
        explanation: 'SDA Non-Hayati (abiotik) adalah sumber daya alam yang berupa benda mati seperti tanah, air, udara, dan sinar surya.',
        funFact: 'Tanpa sinar matahari (SDA non-hayati), tumbuhan tidak bisa melakukan fotosintesis untuk menghasilkan oksigen.',
        basePoints: 100,
        illustrationType: 'sun',
        challenge: {
          type: 'fast_time',
          title: '⚡ Tantangan Refleks Surya',
          description: 'Jawab cepat sebelum timer habis untuk bonus 50 poin!',
          bonusPoints: 50,
          timeLimitSeconds: 12
        }
      },
      {
        id: 'q1-4',
        posNumber: 4,
        posName: 'Pos 4: Tebing Fauna Lestari',
        altitudeMdpl: 2050,
        text: 'Peternakan lebah menghasilkan madu lezat dan lilin sarang lebah. Ini membuktikan bahwa hewan berperan sebagai...',
        questionType: 'multiple_choice',
        options: [
          'SDA Non-Hayati yang cepat habis',
          'SDA Hayati yang menghasilkan bahan pangan dan kesehatan',
          'Penyebab kerusakan lingkungan hutan',
          'Sumber energi fosil yang tertimbun'
        ],
        correctAnswer: 1,
        explanation: 'Hewan seperti lebah adalah bagian dari SDA hayati yang memberikan hasil pangan bergizi (madu) serta membantu penyerbukan tanaman.',
        funFact: 'Lebah madu harus mengunjungi sekitar 2 juta bunga hanya untuk menghasilkan 500 gram madu!',
        basePoints: 100,
        illustrationType: 'animal',
        challenge: {
          type: 'eco_action',
          title: '🌱 Tantangan Sahabat Satwa',
          description: 'Pahami peran penting lebah dalam rantai makanan alam!',
          bonusPoints: 70
        }
      },
      {
        id: 'q1-5',
        posNumber: 5,
        posName: 'Pos 5: Puncak Rimba Nusantara',
        altitudeMdpl: 2450,
        text: 'Mengapa tanah humus di pegunungan sangat berharga bagi kehidupan manusia?',
        questionType: 'multiple_choice',
        options: [
          'Karena bisa dijadikan bahan bakar kendaraan bermotor',
          'Karena sangat subur untuk pertanian sayur dan menyerap air hujan',
          'Karena bisa langsung diubah menjadi logam mulia',
          'Karena tidak memerlukan sinar matahari sama sekali'
        ],
        correctAnswer: 1,
        explanation: 'Tanah humus kaya nutrisi lapuk dari daun-daunan, sangat subur untuk pertanian pangan, dan menjadi spons penyimpan air tanah alami.',
        funFact: 'Dibutuhkan waktu hingga 500 tahun bagi alam untuk membentuk lapisan tanah subur setebal 2,5 sentimeter!',
        basePoints: 120,
        illustrationType: 'soil',
        challenge: {
          type: 'streak',
          title: '🏆 Tantangan Puncak Emas',
          description: 'Kunci kemenangan! Jawab benar untuk mendirikan bendera di Puncak Rimba Hijau!',
          bonusPoints: 80
        }
      }
    ],
    studyNotes: [
      {
        title: 'Pengertian Sumber Daya Alam (SDA)',
        content: 'SDA adalah segala sesuatu yang berasal dari alam dan dapat digunakan untuk memenuhi kebutuhan hidup manusia.',
        keyPoints: [
          'Dibutuhkan untuk sandang (pakaian), pangan (makanan), dan papan (tempat tinggal).',
          'Tersebar di daratan, perairan, dan atmosfer bumi.',
          'Wajib dijaga keseimbangannya agar tidak rusak.'
        ],
        icon: 'Globe'
      },
      {
        title: 'SDA Hayati (Biotik)',
        content: 'Sumber daya alam yang berasal dari makhluk hidup (tumbuhan dan hewan).',
        keyPoints: [
          'Contoh Tumbuhan: Padi, jagung, kayu jati, teh, kopi, kelapa sawit.',
          'Contoh Hewan: Sapi, ayam, ikan bandeng, lebah madu, domba.',
          'Sifat: Dapat berkembang biak jika dirawat dengan baik.'
        ],
        icon: 'Sprout'
      },
      {
        title: 'SDA Non-Hayati (Abiotik)',
        content: 'Sumber daya alam yang berasal dari benda tidak hidup (benda mati).',
        keyPoints: [
          'Contoh: Air, tanah, udara, sinar matahari, batuan mineral.',
          'Sinar matahari dan udara melimpah di alam.',
          'Tanah dan air harus dijaga dari pencemaran sampah dan limbah.'
        ],
        icon: 'Sun'
      }
    ]
  },
  {
    id: 2,
    chapterNumber: 2,
    title: 'Bab 2: Terbarukan vs Tidak Dapat Diperbaharui',
    mountainName: 'Gunung Kencana Energi',
    subtitle: 'Ekspedisi Sumber Energi Bumi',
    description: 'Daki tebing bebatuan dan pembangkit ramah lingkungan untuk menguji pemahaman tentang SDA yang kekal versus SDA fosil yang bisa habis.',
    iconName: 'Zap',
    accentColor: 'amber',
    mountainMaxAltitude: 2850,
    requiredPointsToUnlock: 400, // Requires 400 points from previous adventures
    questions: [
      {
        id: 'q2-1',
        posNumber: 1,
        posName: 'Pos 1: Gua Fosil Purba',
        altitudeMdpl: 620,
        text: 'Sumber daya alam yang dapat pulih kembali secara alami dalam waktu singkat disebut...',
        questionType: 'multiple_choice',
        options: [
          'SDA yang Dapat Diperbaharui (Renewable)',
          'SDA yang Tidak Dapat Diperbaharui (Non-renewable)',
          'SDA Barang Tambang Fosil',
          'SDA Sekali Pakai Habis'
        ],
        correctAnswer: 0,
        explanation: 'SDA yang dapat diperbaharui tidak akan habis jika dikelola dengan bijak, seperti air, angin, cahaya matahari, dan hasil perkebunan.',
        funFact: 'Energi sinar matahari yang menyinari bumi selama 1 jam cukup untuk memenuhi kebutuhan energi seluruh manusia selama setahun!',
        basePoints: 100,
        illustrationType: 'sun',
        challenge: {
          type: 'fast_time',
          title: '⚡ Kecepatan Angin Terbarukan',
          description: 'Selesaikan dalam waktu kurang dari 15 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 15
        }
      },
      {
        id: 'q2-2',
        posNumber: 2,
        posName: 'Pos 2: Cerobong Tambang Batu Bara',
        altitudeMdpl: 1200,
        text: 'Mengapa minyak bumi dan batu bara disebut SDA yang TIDAK dapat diperbaharui?',
        questionType: 'multiple_choice',
        options: [
          'Karena harganya di pasar sangat murah',
          'Karena terbentuk dari fosil purba yang butuh jutaan tahun dan jumlahnya terbatas',
          'Karena bisa dibuat sendiri dengan mudah di dapur rumah',
          'Karena tidak menghasilkan polusi asap sedikit pun'
        ],
        correctAnswer: 1,
        explanation: 'Minyak bumi dan batu bara berasal dari jasad renik dan tumbuhan jutaan tahun lalu yang terpendam. Jika habis dipakai, manusia tidak bisa membuatnya kembali dengan cepat.',
        funFact: 'Setetes bensin yang digunakan mobil berasal dari sisa jasad renik plankton laut zaman dinosaurus!',
        basePoints: 100,
        illustrationType: 'petroleum',
        challenge: {
          type: 'detective',
          title: '🔍 Analisis Fosil Jutaan Tahun',
          description: 'Ingat konsep proses geologis pembentukan bumi!',
          bonusPoints: 60
        }
      },
      {
        id: 'q2-3',
        posNumber: 3,
        posName: 'Pos 3: Lembah Kincir Angin',
        altitudeMdpl: 1820,
        text: 'Manakah pasangan SDA berikut yang KEDUANYA termasuk SDA Dapat Diperbaharui?',
        questionType: 'multiple_choice',
        options: [
          'Angin dan Minyak Bumi',
          'Sinar Matahari dan Aliran Air Sungai',
          'Gas Alam dan Hutan Bakau',
          'Batu Bara dan Emas'
        ],
        correctAnswer: 1,
        explanation: 'Sinar matahari selalu ada melalui siklus surya, dan air sungai terus bersirkulasi lewat siklus hidrologi (hujan), keduanya adalah energi terbarukan.',
        funFact: 'Kincir angin terbesar di dunia memiliki bilah baling-baling yang lebih panjang dari lapangan sepak bola!',
        basePoints: 100,
        illustrationType: 'wind',
        challenge: {
          type: 'fast_time',
          title: '⚡ Refleks Energi Hijau',
          description: 'Tentukan pilihan terbarukan dalam 12 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 12
        }
      },
      {
        id: 'q2-4',
        posNumber: 4,
        posName: 'Pos 4: Lereng Logam Mulia',
        altitudeMdpl: 2380,
        text: 'Emas, tembaga, nikel, dan timah termasuk dalam kelompok sumber daya...',
        questionType: 'multiple_choice',
        options: [
          'Hayati yang bisa ditanam di kebun',
          'Barang tambang yang tidak dapat diperbaharui',
          'Energi abadi yang tidak ada habisnya',
          'Bahan pangan pokok sehari-hari'
        ],
        correctAnswer: 1,
        explanation: 'Logam mineral berada di dalam perut bumi dan jumlahnya terbatas. Sekali ditambang dan habis, mineral ini tidak bisa tumbuh kembali.',
        funFact: 'Indonesia adalah salah satu produsen nikel terbesar di dunia yang digunakan untuk bahan baterai mobil listrik!',
        basePoints: 100,
        illustrationType: 'coal',
        challenge: {
          type: 'eco_action',
          title: '🌱 Tantangan Daur Ulang Logam',
          description: 'Pahami mengapa barang elektronik bekas harus didaur ulang!',
          bonusPoints: 70
        }
      },
      {
        id: 'q2-5',
        posNumber: 5,
        posName: 'Pos 5: Puncak Cakrawala Surya',
        altitudeMdpl: 2850,
        text: 'Apa yang harus dilakukan manusia mengingat minyak bumi dan gas alam jumlahnya semakin menipis di bumi?',
        questionType: 'multiple_choice',
        options: [
          'Menggunakan bensin sebanyak-banyaknya setiap hari',
          'Beralih ke energi alternatif ramah lingkungan seperti PLTS (surya) dan angin',
          'Menebangi semua hutan untuk mencari minyak baru',
          'Menghentikan penggunaan listrik selamanya'
        ],
        correctAnswer: 1,
        explanation: 'Energi alternatif (surya, angin, air, geotermal) adalah solusi masa depan untuk menggantikan bahan bakar fosil tanpa mencemari bumi.',
        funFact: 'Panel surya di atap rumah bisa menghasilkan listrik bersih dari sinar matahari tanpa suara bising!',
        basePoints: 120,
        illustrationType: 'sun',
        challenge: {
          type: 'streak',
          title: '🏆 Kunci Puncak Kencana',
          description: 'Selesaikan untuk menaklukkan Puncak Gunung Kencana 2.850 mdpl!',
          bonusPoints: 80
        }
      }
    ],
    studyNotes: [
      {
        title: 'SDA Dapat Diperbaharui (Terbarukan)',
        content: 'Sumber daya yang ketersediaannya dapat dipulihkan kembali oleh alam.',
        keyPoints: [
          'Contoh: Air, angin, cahaya matahari, tumbuhan, hewan, tanah.',
          'Keunggulan: Ramah lingkungan dan tidak menghasilkan gas buang berbahaya jika dikelola.',
          'Catatan: Hutan dan air tetap bisa rusak jika ditebang serakah atau dicemari!'
        ],
        icon: 'Leaf'
      },
      {
        title: 'SDA Tidak Dapat Diperbaharui (Tak Terbarukan)',
        content: 'Sumber daya yang jumlahnya terbatas dan akan habis bila digunakan terus-menerus.',
        keyPoints: [
          'Bahan Bakar Fosil: Minyak bumi (bensin, solar), batu bara, gas alam.',
          'Barang Tambang Mineral Logam: Emas, perak, besi, tembaga, nikel, aluminium.',
          'Barang Tambang Non-Logam: Belerang, marmer, asbes, intan.',
          'Waktu Pembentukan: Membutuhkan ratusan juta tahun di kerak bumi.'
        ],
        icon: 'Flame'
      }
    ]
  },
  {
    id: 3,
    chapterNumber: 3,
    title: 'Bab 3: Pemanfaatan SDA untuk Kehidupan',
    mountainName: 'Gunung Swarna Dwipa',
    subtitle: 'Karya Nyata dari Alam Nusantara',
    description: 'Telusuri lereng perkebunan kapas, bendungan PLTA, dan lumbung pangan nusantara yang menopang sandang, pangan, dan energi kita.',
    iconName: 'Hammer',
    accentColor: 'blue',
    mountainMaxAltitude: 3100,
    requiredPointsToUnlock: 900, // Requires 900 points total to unlock Chapter 3
    questions: [
      {
        id: 'q3-1',
        posNumber: 1,
        posName: 'Pos 1: Lumbung Pangan Nusantara',
        altitudeMdpl: 780,
        text: 'Tanaman padi, jagung, ubi kayu, dan sagu dimanfaatkan manusia terutama untuk memenuhi kebutuhan...',
        questionType: 'multiple_choice',
        options: [
          'Pangan (makanan pokok sumber karbohidrat)',
          'Sandang (kain pakaian)',
          'Papan (material bangunan rumah)',
          'Bahan bakar roket antariksa'
        ],
        correctAnswer: 0,
        explanation: 'Padi, jagung, ubi, dan sagu adalah tanaman pangan kaya karbohidrat yang memberi energi tubuh untuk belajar dan beraktivitas.',
        funFact: 'Sagu di Maluku dan Papua diambil dari bagian dalam batang pohon sagu yang berusia 10 tahun!',
        basePoints: 100,
        illustrationType: 'plant',
        challenge: {
          type: 'fast_time',
          title: '⚡ Kilat Gizi Pangan',
          description: 'Jawab dalam waktu kurang dari 15 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 15
        }
      },
      {
        id: 'q3-2',
        posNumber: 2,
        posName: 'Pos 2: Ladang Kapas & Ulat Sutra',
        altitudeMdpl: 1420,
        text: 'Serat dari tanaman kapas dan kepompong ulat sutra dimanfaatkan untuk kebutuhan...',
        questionType: 'multiple_choice',
        options: [
          'Papan untuk membuat lantai rumah',
          'Sandang untuk membuat benang dan kain pakaian',
          'Bahan minyak goreng di dapur',
          'Pembangkit listrik tenaga uap'
        ],
        correctAnswer: 1,
        explanation: 'Kapas dipintal menjadi benang katun yang sejuk dipakai, sedangkan kepompong ulat sutra menghasilkan kain sutra yang sangat halus.',
        funFact: 'Satu helai benang sutra dari kepompong ulat sutra panjangnya bisa mencapai 900 meter!',
        basePoints: 100,
        illustrationType: 'forest',
        challenge: {
          type: 'detective',
          title: '🔍 Petunjuk Benang Ajaib',
          description: 'Identifikasi serat alami penghasil sandang nusantara!',
          bonusPoints: 60
        }
      },
      {
        id: 'q3-3',
        posNumber: 3,
        posName: 'Pos 3: Bendungan Air Raksasa',
        altitudeMdpl: 2040,
        text: 'Pembangkit Listrik Tenaga Air (PLTA) memanfaatkan aliran air bendungan yang deras untuk memutar...',
        questionType: 'multiple_choice',
        options: [
          'Baling-baling kipas angin biasa',
          'Turbin yang kemudian menggerakkan generator listrik',
          'Roda sepeda kayuh',
          'Pompa bensin minyak bumi'
        ],
        correctAnswer: 1,
        explanation: 'Energi gerak (kinetik) dari air terjun/bendungan memutar turbin, lalu generator mengubahnya menjadi energi listrik untuk rumah dan sekolah.',
        funFact: 'PLTA Cirata di Jawa Barat adalah salah satu pembangkit listrik tenaga air terbesar di Asia Tenggara!',
        basePoints: 100,
        illustrationType: 'water',
        challenge: {
          type: 'fast_time',
          title: '⚡ Turbin Air Berputar Cepat',
          description: 'Putar otakmu dan jawab tepat dalam 12 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 12
        }
      },
      {
        id: 'q3-4',
        posNumber: 4,
        posName: 'Pos 4: Lembah Hutan Kayu Jati & Meranti',
        altitudeMdpl: 2600,
        text: 'Kayu jati, mahoni, dan bambu dimanfaatkan manusia untuk kebutuhan PAPAN, contohnya...',
        questionType: 'multiple_choice',
        options: [
          'Membuat bumbu masakan rendang',
          'Kusen pintu, tiang rumah, dan perabotan meja kursi',
          'Bahan pembuat kain sutra halus',
          'Bahan pengisi baterai handphone'
        ],
        correctAnswer: 1,
        explanation: 'Kebutuhan papan berkaitan dengan tempat tinggal dan perlengkapannya, seperti rumah kayu, atap bambu, lemari, meja, dan kursi belajar.',
        funFact: 'Bambu adalah tumbuhan dengan laju pertumbuhan paling cepat di dunia, bisa tumbuh hingga 90 cm per hari!',
        basePoints: 100,
        illustrationType: 'forest',
        challenge: {
          type: 'eco_action',
          title: '🌱 Tebang Pilih & Reboisasi',
          description: 'Pahami cara bijak memanfaatkan kayu tanpa merusak hutan!',
          bonusPoints: 70
        }
      },
      {
        id: 'q3-5',
        posNumber: 5,
        posName: 'Pos 5: Puncak Swarna Dwipa',
        altitudeMdpl: 3100,
        text: 'Minyak kelapa sawit yang banyak dihasilkan di Sumatra dan Kalimantan diolah manusia menjadi...',
        questionType: 'multiple_choice',
        options: [
          'Batu baterai jam dinding',
          'Minyak goreng, margarin, dan sabun mandi',
          'Bahan cat tembok anti air',
          'Air mineral botol'
        ],
        correctAnswer: 1,
        explanation: 'Minyak kelapa sawit (CPO) diolah menjadi bahan pangan seperti minyak goreng dan margarin, serta produk kebersihan seperti sabun.',
        funFact: 'Satu pohon kelapa sawit dapat terus menghasilkan buah segar hingga usia 25 tahun!',
        basePoints: 120,
        illustrationType: 'plant',
        challenge: {
          type: 'streak',
          title: '🏆 Kibaran Sang Saka di 3.100 mdpl',
          description: 'Raih poin penuh untuk membuka Bab 4 Mahameru Lestari!',
          bonusPoints: 80
        }
      }
    ],
    studyNotes: [
      {
        title: 'Pemanfaatan untuk Sandang, Pangan, Papan',
        content: 'Tiga kebutuhan primer manusia semuanya bersumber dari kelimpahan alam.',
        keyPoints: [
          'Pangan: Beras, gandum, sayur, buah, telur, ikan, daging sapi.',
          'Sandang: Serat kapas (katun), ulat sutra (sutra), bulu domba (wol).',
          'Papan: Kayu jati, meranti, bambu, batu kali, pasir sungai, semen kapur.'
        ],
        icon: 'PackageCheck'
      },
      {
        title: 'Pemanfaatan untuk Energi & Listrik',
        content: 'Energi menggerakkan mesin, kendaraan, dan menerangi peradaban manusia.',
        keyPoints: [
          'PLTA: Memanfaatkan dorongan aliran air sungai/waduk.',
          'PLTS: Memanfaatkan sel surya penangkap cahaya matahari.',
          'PLTU: Memanfaatkan uap hasil pembakaran batu bara (menghasilkan asap polusi).',
          'Geotermal (Panas Bumi): Memanfaatkan uap magma panas bumi Indonesia.'
        ],
        icon: 'Zap'
      }
    ]
  },
  {
    id: 4,
    chapterNumber: 4,
    title: 'Bab 4: Konservasi & Pelestarian Sumber Daya Alam',
    mountainName: 'Puncak Mahameru Lestari',
    subtitle: 'Misi Penyelamat Bumi Nusantara',
    description: 'Tantangan tertinggi di puncak berselimut salju abadi untuk membuktikan komitmenmu menjaga kelestarian alam bagi generasi masa depan.',
    iconName: 'ShieldCheck',
    accentColor: 'teal',
    mountainMaxAltitude: 3676,
    requiredPointsToUnlock: 1500, // Requires 1500 points across chapters to enter Master Level
    questions: [
      {
        id: 'q4-1',
        posNumber: 1,
        posName: 'Pos 1: Lereng Terasering Hijau',
        altitudeMdpl: 900,
        text: 'Penanaman kembali hutan yang telah gundul akibat penebangan liar disebut...',
        questionType: 'multiple_choice',
        options: [
          'Reboisasi',
          'Eksploitasi',
          'Urbanisasi',
          'Irigasi'
        ],
        correctAnswer: 0,
        explanation: 'Reboisasi (penghijauan kembali) menanam pohon baru di lahan gundul agar akar pohon dapat mengikat air tanah dan mencegah bencana tanah longsor.',
        funFact: 'Satu pohon dewasa yang rindang mampu menghasilkan oksigen cukup untuk bernapas 4 orang manusia setiap hari!',
        basePoints: 100,
        illustrationType: 'forest',
        challenge: {
          type: 'fast_time',
          title: '⚡ Sigap Reboisasi',
          description: 'Pilih tindakan pelestarian alam dalam 15 detik!',
          bonusPoints: 50,
          timeLimitSeconds: 15
        }
      },
      {
        id: 'q4-2',
        posNumber: 2,
        posName: 'Pos 2: Suaka Margasatwa Ujung Kulon',
        altitudeMdpl: 1650,
        text: 'Mengapa pemerintah mendirikan Taman Nasional dan Suaka Margasatwa untuk hewan seperti Badak Bercula Satu dan Komodo?',
        questionType: 'multiple_choice',
        options: [
          'Agar hewan tersebut dapat dijual ke luar negeri dengan harga mahal',
          'Untuk melindungi satwa langka dari perburuan liar dan kepunahan',
          'Supaya bisa dijadikan hewan aduan setiap akhir pekan',
          'Untuk melatih hewan-hewan tersebut sirkus keliling'
        ],
        correctAnswer: 1,
        explanation: 'Kawasan suaka margasatwa melindungi satwa langka agar dapat hidup dan berkembang biak secara alami tanpa diganggu pemburu liar.',
        funFact: 'Badak Jawa bercula satu di Taman Nasional Ujung Kulon adalah salah satu mamalia darat terlangka di muka bumi!',
        basePoints: 100,
        illustrationType: 'animal',
        challenge: {
          type: 'detective',
          title: '🔍 Pelindung Satwa Endemik',
          description: 'Identifikasi tujuan utama kawasan konservasi nasional!',
          bonusPoints: 60
        }
      },
      {
        id: 'q4-3',
        posNumber: 3,
        posName: 'Pos 3: Sungai Biru Bebas Sampah',
        altitudeMdpl: 2350,
        text: 'Prinsip 3R (Reduce, Reuse, Recycle) sangat efektif mengurangi tumpukan sampah plastik. Arti dari RECYCLE adalah...',
        questionType: 'multiple_choice',
        options: [
          'Membakar sampah di pekarangan rumah',
          'Mendaur ulang barang bekas menjadi produk baru yang bermanfaat',
          'Membuang sampah ke aliran sungai saat hujan lebat',
          'Membeli barang plastik sekali pakai sebanyak-banyaknya'
        ],
        correctAnswer: 1,
        explanation: 'Recycle (daur ulang) adalah mengolah sampah (seperti botol plastik, kertas koran, kaleng) menjadi barang baru sehingga hemat bahan mentah alam.',
        funFact: 'Mendaur ulang 1 botol plastik dapat menghemat energi yang cukup untuk menyalakan lampu bohlam selama 3 jam!',
        basePoints: 100,
        illustrationType: 'recycle',
        challenge: {
          type: 'eco_action',
          title: '🌱 Aksi Nyata Daur Ulang',
          description: 'Kuasai konsep Reduce, Reuse, Recycle untuk bumi lestari!',
          bonusPoints: 70
        }
      },
      {
        id: 'q4-4',
        posNumber: 4,
        posName: 'Pos 4: Padang Bunga Edelweis',
        altitudeMdpl: 3050,
        text: 'Menangkap ikan menggunakan pukat harimau atau bom ikan sangat dilarang di laut Indonesia karena...',
        questionType: 'multiple_choice',
        options: [
          'Membuat air laut berubah menjadi air tawar',
          'Merusak terumbu karang dan mematikan ikan-ikan kecil yang belum dewasa',
          'Membuat kapal nelayan melaju terlalu cepat',
          'Menghilangkan garam dari air laut'
        ],
        correctAnswer: 1,
        explanation: 'Bom ikan dan racun menghancurkan terumbu karang (rumah ikan) serta membunuh benih ikan kecil, membuat ekosistem laut rusak dan nelayan merugi.',
        funFact: 'Terumbu karang Indonesia mencakup 18% dari seluruh terumbu karang di dunia dan dihuni ribuan jenis biota laut indah!',
        basePoints: 100,
        illustrationType: 'water',
        challenge: {
          type: 'fast_time',
          title: '⚡ Selamatkan Terumbu Karang',
          description: 'Jawab cepat dalam 12 detik untuk menjaga lautan!',
          bonusPoints: 50,
          timeLimitSeconds: 12
        }
      },
      {
        id: 'q4-5',
        posNumber: 5,
        posName: 'Pos 5: Puncak Tertinggi Mahameru',
        altitudeMdpl: 3676,
        text: 'Perilaku sehari-hari siswa kelas 5 SD yang paling tepat untuk menghemat sumber daya alam adalah...',
        questionType: 'multiple_choice',
        options: [
          'Membiarkan keran air mengalir dan lampu kamar menyala saat bepergian',
          'Mematikan lampu bila tidak dipakai, membawa botol minum sendiri, dan menghabiskan makanan',
          'Mencoret-coret lembaran buku tulis yang masih kosong lalu membuangnya',
          'Meminta orang tua membeli motor baru setiap bulan'
        ],
        correctAnswer: 1,
        explanation: 'Tindakan sederhana seperti hemat air, hemat listrik, memakai botol minum isi ulang (tumbler), dan menghargai makanan adalah bukti nyata cinta lingkungan.',
        funFact: 'Jika setiap anak di kelas menghemat 1 lembar kertas per hari, ribuan pohon di hutan terselamatkan dari penebangan!',
        basePoints: 150,
        illustrationType: 'sun',
        challenge: {
          type: 'streak',
          title: '👑 Puncak Mahameru Nusantara',
          description: 'Jawab dengan hati nurani untuk meraih Gelar Mahaguru Ranger Alam!',
          bonusPoints: 100
        }
      }
    ],
    studyNotes: [
      {
        title: 'Ancaman Kerusakan SDA',
        content: 'Tindakan manusia yang serakah dapat merusak kelestarian sumber daya alam.',
        keyPoints: [
          'Penebangan Liar (Ilegal Logging): Menyebabkan banjir, tanah longsor, dan hilangnya habitat satwa.',
          'Pencemaran Sampah & Limbah: Mencemari air minum dan meracuni ikan.',
          'Penambangan Terbuka Tanpa Reklamasi: Merusak lapisan tanah subur.',
          'Perburuan Liar: Mendorong satwa langka ke jurang kepunahan.'
        ],
        icon: 'AlertTriangle'
      },
      {
        title: 'Upaya Pelestarian SDA',
        content: 'Tindakan bijak untuk menjaga agar alam tetap lestari dan berkelanjutan.',
        keyPoints: [
          'Reboisasi & Terasering di perbukitan.',
          'Kawasan Konservasi: Cagar Alam, Suaka Margasatwa, Taman Nasional.',
          'Prinsip 3R: Reduce (kurangi), Reuse (gunakan kembali), Recycle (daur ulang).',
          'Menghemat energi listrik dan air bersih di rumah maupun sekolah.'
        ],
        icon: 'ShieldCheck'
      }
    ]
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-1',
    title: 'Pendaki Pemula',
    description: 'Berhasil memulai ekspedisi pertama di Pos 1!',
    icon: 'Compass',
    unlockedAtPoints: 100
  },
  {
    id: 'badge-2',
    title: 'Sahabat Hayati',
    description: 'Menaklukkan Puncak Rimba Hijau dan menguasai materi biotik!',
    icon: 'Trees',
    unlockedAtPoints: 500,
    chapterIdRequired: 1
  },
  {
    id: 'badge-3',
    title: 'Pahlawan Energi Bersih',
    description: 'Menaklukkan Gunung Kencana dan memahami energi terbarukan!',
    icon: 'Sun',
    unlockedAtPoints: 1100,
    chapterIdRequired: 2
  },
  {
    id: 'badge-4',
    title: 'Arsitek Nusantara',
    description: 'Menguasai pemanfaatan SDA untuk sandang, pangan, dan papan!',
    icon: 'Hammer',
    unlockedAtPoints: 1800,
    chapterIdRequired: 3
  },
  {
    id: 'badge-5',
    title: 'Ranger Alam Mahameru',
    description: 'Menaklukkan seluruh 4 puncak gunung dan menguasai konservasi!',
    icon: 'Award',
    unlockedAtPoints: 2500,
    chapterIdRequired: 4
  }
];
