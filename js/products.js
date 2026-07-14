/* =========================================================================
   MOOD PERFUME — product catalog
   Images are local: img/products/<slug>.png or .webp (see each item's img).
   Fragrance notes / year / perfumer / description are real, per-product data.
   ========================================================================= */
const PRODUCTS = [
  {
    "id": 1, "brand": "MAISON FRANCIS KURKDJIAN", "name": "Baccarat Rouge 540 Extrait",
    "slug": "maison-francis-kurkdjian-baccarat-rouge-540-extrait", "low": 7.0, "high": 270.0,
    "img": "img/products/maison-francis-kurkdjian-baccarat-rouge-540-extrait.png", "tag": "Best Seller",
    "year": 2017, "perfumer": "Francis Kurkdjian",
    "notes": { "top": ["Jasmine (Grandiflorum)", "Saffron"], "heart": ["Amberwood", "Ambergris"], "base": ["Fir Resin", "Cedar"] },
    "description": "A more concentrated extrait take on the iconic Baccarat Rouge 540, pairing luminous jasmine and saffron with a warm, mineral amberwood base."
  },
  {
    "id": 2, "brand": "MARC-ANTOINE BARROIS", "name": "Ganymede",
    "slug": "marc-antoine-barrois-ganymede", "low": 5.0, "high": 155.0,
    "img": "img/products/marc-antoine-barrois-ganymede.webp", "tag": "Best Seller",
    "year": 2019, "perfumer": "Quentin Bisch",
    "notes": { "top": ["Saffron", "Italian Mandarin"], "heart": ["Chinese Osmanthus", "Immortelle", "Violet Leaf"], "base": ["Mineral Notes", "Suede", "Akigalawood", "Cedar", "Musk", "Patchouli"] },
    "description": "A cool, mineral woody-spicy scent centred on a metallic leather accord warmed by the spicy glow of immortelle."
  },
  {
    "id": 3, "brand": "NISHANE", "name": "Hacivat",
    "slug": "nishane-hacivat", "low": 4.0, "high": 130.0,
    "img": "img/products/nishane-hacivat.png", "tag": "Best Seller",
    "year": 2017, "perfumer": "Jorge Lee",
    "notes": { "top": ["Bergamot", "Pineapple", "Grapefruit"], "heart": ["Jasmine", "Patchouli", "Cedarwood"], "base": ["Clearwood", "Oakmoss", "Dry Timberwood"] },
    "description": "A woody-citrus chypre whose bright pineapple-and-bergamot opening settles over genuine mossy woods."
  },
  {
    "id": 4, "brand": "XERJOFF", "name": "Naxos",
    "slug": "xerjoff-naxos", "low": 4.0, "high": 135.0,
    "img": "img/products/xerjoff-naxos.png", "tag": "Best Seller",
    "year": 2015,
    "notes": { "top": ["Lavender", "Bergamot", "Lemon"], "heart": ["Honey", "Cashmere", "Cinnamon", "Jasmine Sambac"], "base": ["Tobacco", "Tonka Bean", "Vanilla"] },
    "description": "A sweet, spicy Italian favourite woven from honey, tobacco and vanilla, with generous projection."
  },
  {
    "id": 5, "brand": "Byredo", "name": "Black Saffron",
    "slug": "byredo-black-saffron-absolu", "low": 6.0, "high": 215.0,
    "img": "img/products/byredo-black-saffron-absolu.webp", "tag": "New Arrival",
    "year": 2012,
    "notes": { "top": ["Juniper Berries", "Pomelo", "Saffron"], "heart": ["Black Violet", "Crystal Rose", "Leather Accord"], "base": ["Blonde Woods", "Raspberry", "Vetiver"] },
    "description": "An oriental-spicy composition that opens on pomelo and juniper softened by golden saffron, resting on a dark violet-and-leather heart."
  },
  {
    "id": 6, "brand": "CHANEL", "name": "Coromandel",
    "slug": "chanel-coromandel", "low": 6.0, "high": 215.0,
    "img": "img/products/chanel-coromandel.png", "tag": "New Arrival",
    "year": 2007, "perfumer": "Jacques Polge",
    "notes": { "top": ["Bitter Orange", "Neroli", "Citruses"], "heart": ["Patchouli", "Orris", "Rose", "Jasmine"], "base": ["Benzoin", "White Chocolate", "Incense", "Tahitian Vanilla", "Musk"] },
    "description": "A rich woody-oriental from Chanel's Les Exclusifs, warm and mystical with a gourmand incense drydown."
  },
  {
    "id": 7, "brand": "CLIVE CHRISTIAN", "name": "X For Men",
    "slug": "clive-christian-x-for-men", "low": 6.0, "high": 235.0,
    "img": "img/products/clive-christian-x-for-men.webp", "tag": "New Arrival",
    "year": 2001, "perfumer": "Geza Schoen",
    "notes": { "top": ["Rhubarb", "Pineapple", "Bergamot"], "heart": ["Iris", "Paprika", "Jasmine"], "base": ["Virginia Cedar", "Cinnamon", "Oakmoss", "Amber", "Vetiver", "Styrax", "Vanilla"] },
    "description": "An oriental fougère with an unexpected fruity-spicy opening that resolves into a classic amber-and-vetiver base."
  },
  {
    "id": 8, "brand": "Guerlain", "name": "Oud Khôl",
    "slug": "guerlain-oud-kh-l", "low": 6.0, "high": 440.0,
    "img": "img/products/guerlain-oud-kh-l.png", "tag": "New Arrival",
    "year": 2022, "perfumer": "Thierry Wasser",
    "notes": { "blend": ["Aldehydes", "Agarwood (Oud)", "Leather", "Moss", "Praline"] },
    "description": "A study in black — aldehydes and leather sharpen a smoky, charcoal-tinged oud."
  },
  {
    "id": 9, "brand": "LE LABO", "name": "Santal 33",
    "slug": "le-labo-santal-33", "low": 6.0, "high": 215.0,
    "img": "img/products/le-labo-santal-33.webp", "tag": "New Arrival",
    "year": 2011, "perfumer": "Frank Voelkl",
    "notes": { "blend": ["Sandalwood", "Cardamom", "Iris", "Violet", "Ambrox", "Cedar", "Leather"] },
    "description": "The cult unisex woody-leather fragrance, built on Australian sandalwood with a warm cardamom-and-iris heart."
  },
  {
    "id": 10, "brand": "PARFUMS DE MARLY", "name": "Pegasus",
    "slug": "parfums-de-marly-pegasus", "low": 4.0, "high": 150.0,
    "img": "img/products/parfums-de-marly-pegasus.webp", "tag": "New Arrival",
    "year": 2011,
    "notes": { "top": ["Heliotrope", "Cumin", "Bergamot"], "heart": ["Bitter Almond", "Lavender", "Jasmine"], "base": ["Vanilla", "Sandalwood", "Amber"] },
    "description": "A radiant, almond-softened bergamot that unfolds into a warm, enveloping vanilla-and-sandalwood base."
  },
  {
    "id": 11, "brand": "TIZIANA TERENZI", "name": "Poggia",
    "slug": "tiziana-terenzi-poggia", "low": 5.0, "high": 195.0,
    "img": "img/products/tiziana-terenzi-poggia.webp", "tag": "New Arrival",
    "year": 2020, "perfumer": "Paolo Terenzi",
    "notes": { "top": ["Bergamot", "Lemon", "Peach", "Orange"], "heart": ["Ylang-Ylang", "Rosemary", "Passionfruit", "Turkish Rose", "Green Apple"], "base": ["Musk", "Ambergris", "Vanilla"] },
    "description": "A fresh chypre-floral that travels from citrus and fruit to a sensual musk-and-vanilla base, at home day or night."
  },
  {
    "id": 12, "brand": "AMOUAGE", "name": "Reflection Woman",
    "slug": "amouage-reflection-woman", "low": 5.0, "high": 155.0,
    "img": "img/products/amouage-reflection-woman.png", "tag": "",
    "year": 2006, "perfumer": "Maurice Roucel",
    "notes": { "top": ["Green Leaves", "Freesia", "Water Violet"], "heart": ["Magnolia", "Jasmine", "Ylang-Ylang"], "base": ["Cedar", "Sandalwood", "Amber", "Musk"] },
    "description": "A fresh, noble floral that opens brightly before settling into warm cedar and amber — refined and understated."
  },
  {
    "id": 13, "brand": "DIPTYQUE", "name": "Tam Dao",
    "slug": "diptyque-tam-dao", "low": 5.0, "high": 150.0,
    "img": "img/products/diptyque-tam-dao.webp", "tag": "",
    "year": 2013, "perfumer": "Daniel Moliere",
    "notes": { "blend": ["Sandalwood", "Cedar", "Amberwood", "Coriander", "Musk", "Lime", "Vanilla", "Ginger"] },
    "description": "A meditative, velvety sandalwood — one of Diptyque's most iconic scents, milky and gently spiced."
  },
  {
    "id": 14, "brand": "INITIO", "name": "Oud for Happiness",
    "slug": "initio-oud-for-happiness", "low": 5.0, "high": 160.0,
    "img": "img/products/initio-oud-for-happiness.webp", "tag": "",
    "year": 2021,
    "notes": { "top": ["Bergamot", "Ginger"], "heart": ["Liquorice", "Vanilla", "Oud"], "base": ["Cedarwood", "Musk"] },
    "description": "A modern, uplifting oud — fresh and energising up top, warm and spiced at the base."
  },
  {
    "id": 15, "brand": "NASOMATTO", "name": "Baraonda",
    "slug": "nasomatto-baraonda", "low": 8.0, "high": 95.0,
    "img": "img/products/nasomatto-baraonda.png", "tag": "",
    "year": 2016, "perfumer": "Alessandro Gualtieri",
    "notes": { "blend": ["Whiskey Accord", "Woody Notes", "Ambrette", "Rose", "Ambroxan", "Musk"] },
    "description": "A boozy, toasted whiskey accord over a soft rose-and-musk heart — warm, resinous and lightly gourmand."
  },
  {
    "id": 16, "brand": "SERGE LUTENS", "name": "Ambre Sultan",
    "slug": "serge-lutens-ambre-sultan", "low": 3.0, "high": 95.0,
    "img": "img/products/serge-lutens-ambre-sultan.webp", "tag": "",
    "year": 1993, "perfumer": "Christopher Sheldrake",
    "notes": { "top": ["Angelica Root", "Coriander", "Bay Leaf", "Myrtle", "Oregano"], "heart": ["Tolu Balm", "Labdanum", "Amber", "Benzoin", "Styrax"], "base": ["Sandalwood", "Vanilla", "Patchouli", "Cistus"] },
    "description": "A herbal, resinous amber built from Mediterranean herbs over a warm, ambery patchouli base — a modern classic of its genre."
  },
  {
    "id": 17, "brand": "CREED", "name": "Oud Zarian",
    "slug": "creed-oud-zarian", "low": 8.0, "high": 315.0,
    "img": "img/products/creed-oud-zarian.webp", "tag": "Coming Soon",
    "year": 2025,
    "notes": { "top": ["Spices", "Frankincense", "Ginger", "Bergamot"], "heart": ["May Rose"], "base": ["Liquorice", "Myrrh", "Oud", "Tonka Bean", "Sandalwood", "Patchouli"] },
    "description": "Built around an 80-year-aged Oud Choron, marrying spicy and amber accords with unusual woody depth."
  },
  {
    "id": 18, "brand": "FREDERIC MALLE", "name": "Carnal Flower",
    "slug": "frederic-malle-carnal-flower", "low": 6.0, "high": 235.0,
    "img": "img/products/frederic-malle-carnal-flower.png", "tag": "Coming Soon",
    "year": 2005, "perfumer": "Dominique Ropion",
    "notes": { "top": ["Eucalyptus", "Melon", "Bergamot", "Galbanum"], "heart": ["Coconut", "Tuberose", "Jasmine", "Ylang-Ylang", "Orange Blossom"], "base": ["White Musk", "Animal Notes", "Amber"] },
    "description": "One of the highest concentrations of natural tuberose absolute in any perfume — green, coconut-laced and heady."
  },
  {
    "id": 19, "brand": "ROJA DOVE", "name": "Amber Aoud",
    "slug": "roja-dove-amber-aoud", "low": 10.0, "high": 395.0,
    "img": "img/products/roja-dove-amber-aoud.webp", "tag": "Coming Soon",
    "year": 2012, "perfumer": "Roja Dove",
    "notes": { "top": ["Bergamot", "Lemon", "Lime"], "heart": ["Rose", "Fig", "Ylang-Ylang", "Jasmine"], "base": ["Agarwood (Oud)", "Ambergris", "Saffron", "Civet", "Sandalwood", "Musk", "Cinnamon"] },
    "description": "A maximalist oriental-spicy composition that balances sweet, spicy, salty and woody facets around rose, saffron and oud."
  }
];

const BRANDS = [
  {"name": "AMOUAGE", "count": 1},
  {"name": "Byredo", "count": 1},
  {"name": "CHANEL", "count": 1},
  {"name": "CLIVE CHRISTIAN", "count": 1},
  {"name": "CREED", "count": 1},
  {"name": "DIPTYQUE", "count": 1},
  {"name": "FREDERIC MALLE", "count": 1},
  {"name": "Guerlain", "count": 1},
  {"name": "INITIO", "count": 1},
  {"name": "LE LABO", "count": 1},
  {"name": "MAISON FRANCIS KURKDJIAN", "count": 1},
  {"name": "MARC-ANTOINE BARROIS", "count": 1},
  {"name": "NASOMATTO", "count": 1},
  {"name": "NISHANE", "count": 1},
  {"name": "PARFUMS DE MARLY", "count": 1},
  {"name": "ROJA DOVE", "count": 1},
  {"name": "SERGE LUTENS", "count": 1},
  {"name": "TIZIANA TERENZI", "count": 1},
  {"name": "XERJOFF", "count": 1}
];
