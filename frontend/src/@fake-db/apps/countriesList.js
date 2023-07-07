// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  countries: [
    {
      id: 1,
      iso: 'AF',
      name: 'Afghanistan',
      nicename: 'Afghanistan',
      iso3: 'AFG',
      numcode: 4,
      phonecode: 93
    },
    {
      id: 2,
      iso: 'AL',
      name: 'Albania',
      nicename: 'Albania',
      iso3: 'ALB',
      numcode: 8,
      phonecode: 355
    },
    {
      id: 3,
      iso: 'DZ',
      name: 'Algeria',
      nicename: 'Algeria',
      iso3: 'DZA',
      numcode: 12,
      phonecode: 213
    },
    {
      id: 4,
      iso: 'AD',
      name: 'Andorra',
      nicename: 'Andorra',
      iso3: 'AND',
      numcode: 20,
      phonecode: 376
    },
    {
      id: 5,
      iso: 'AO',
      name: 'Angola',
      nicename: 'Angola',
      iso3: 'AGO',
      numcode: 24,
      phonecode: 244
    },
    {
      id: 6,
      iso: 'AI',
      name: 'Anguilla',
      nicename: 'Anguilla',
      iso3: 'AIA',
      numcode: 660,
      phonecode: 1264
    },
    {
      id: 7,
      iso: 'AQ',
      name: 'Antarctica',
      nicename: 'Antarctica',
      iso3: 'ATA',
      numcode: 10,
      phonecode: 672
    },
    {
      id: 8,
      iso: 'AG',
      name: 'Antigua and Barbuda',
      nicename: 'Antigua and Barbuda',
      iso3: 'ATG',
      numcode: 28,
      phonecode: 1268
    },
    {
      id: 9,
      iso: 'AR',
      name: 'Argentina',
      nicename: 'Argentina',
      iso3: 'ARG',
      numcode: 32,
      phonecode: 54
    },
    {
      id: 10,
      iso: 'AM',
      name: 'Armenia',
      nicename: 'Armenia',
      iso3: 'ARM',
      numcode: 51,
      phonecode: 374
    },
    {
      id: 11,
      iso: 'AW',
      name: 'Aruba',
      nicename: 'Aruba',
      iso3: 'ABW',
      numcode: 533,
      phonecode: 297
    },
    {
      id: 12,
      iso: 'AU',
      name: 'Australia',
      nicename: 'Australia',
      iso3: 'AUS',
      numcode: 36,
      phonecode: 61
    },
    {
      id: 13,
      iso: 'AT',
      name: 'Austria',
      nicename: 'Austria',
      iso3: 'AUT',
      numcode: 40,
      phonecode: 43
    },
    {
      id: 14,
      iso: 'AZ',
      name: 'Azerbaijan',
      nicename: 'Azerbaijan',
      iso3: 'AZE',
      numcode: 31,
      phonecode: 994
    },
    {
      id: 15,
      iso: 'BS',
      name: 'Bahamas',
      nicename: 'Bahamas',
      iso3: 'BHS',
      numcode: 44,
      phonecode: 1242
    },
    {
      id: 16,
      iso: 'BH',
      name: 'Bahrain',
      nicename: 'Bahrain',
      iso3: 'BHR',
      numcode: 48,
      phonecode: 973
    },
    {
      id: 17,
      iso: 'BD',
      name: 'Bangladesh',
      nicename: 'Bangladesh',
      iso3: 'BGD',
      numcode: 50,
      phonecode: 880
    },
    {
      id: 18,
      iso: 'BB',
      name: 'Barbados',
      nicename: 'Barbados',
      iso3: 'BRB',
      numcode: 52,
      phonecode: 1246
    },
    {
      id: 19,
      iso: 'BY',
      name: 'Belarus',
      nicename: 'Belarus',
      iso3: 'BLR',
      numcode: 112,
      phonecode: 375
    },
    {
      id: 20,
      iso: 'BE',
      name: 'Belgium',
      nicename: 'Belgium',
      iso3: 'BEL',
      numcode: 56,
      phonecode: 32
    },
    {
      id: 21,
      iso: 'BZ',
      name: 'Belize',
      nicename: 'Belize',
      iso3: 'BLZ',
      numcode: 84,
      phonecode: 501
    },
    {
      id: 22,
      iso: 'BJ',
      name: 'Benin',
      nicename: 'Benin',
      iso3: 'BEN',
      numcode: 204,
      phonecode: 229
    },
    {
      id: 23,
      iso: 'BM',
      name: 'Bermuda',
      nicename: 'Bermuda',
      iso3: 'BMU',
      numcode: 60,
      phonecode: 1441
    },
    {
      id: 24,
      iso: 'BT',
      name: 'Bhutan',
      nicename: 'Bhutan',
      iso3: 'BTN',
      numcode: 64,
      phonecode: 975
    },
    {
      id: 25,
      iso: 'BO',
      name: 'Bolivia',
      nicename: 'Bolivia',
      iso3: 'BOL',
      numcode: 68,
      phonecode: 591
    },
    {
      id: 26,
      iso: 'BA',
      name: 'Bosnia and Herzegovina',
      nicename: 'Bosnia and Herzegovina',
      iso3: 'BIH',
      numcode: 70,
      phonecode: 387
    },
    {
      id: 27,
      iso: 'BW',
      name: 'Botswana',
      nicename: 'Botswana',
      iso3: 'BWA',
      numcode: 72,
      phonecode: 267
    },
    {
      id: 28,
      iso: 'BR',
      name: 'Brazil',
      nicename: 'Brazil',
      iso3: 'BRA',
      numcode: 76,
      phonecode: 55
    },
    {
      id: 29,
      iso: 'BN',
      name: 'Brunei Darussalam',
      nicename: 'Brunei Darussalam',
      iso3: 'BRN',
      numcode: 96,
      phonecode: 673
    },
    {
      id: 30,
      iso: 'BG',
      name: 'Bulgaria',
      nicename: 'Bulgaria',
      iso3: 'BGR',
      numcode: 100,
      phonecode: 359
    }
  ]
}

// GET: DATA
mock.onGet('/apps/countriesList').reply(config => {
  const { q = '', role = null, status = null, currentPlan = null } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.countries.filter(
    country =>
      country.name.toLowerCase().includes(queryLowered) ||
      country.nicename.toLowerCase().includes(queryLowered) ||
      country.iso.toLowerCase().includes(queryLowered) ||
      country.iso3.toLowerCase().includes(queryLowered) ||
      country.numcode.toLowerCase().includes(queryLowered) ||
      country.phonecode.toLowerCase().includes(queryLowered)
  )

  return [
    200,
    {
      allData: data.countries,
      countries: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})
