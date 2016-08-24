# csv2json
Simple conversion of CSV to JSON with NodeJS.

## Installation

csv2json requires [csv-parser](https://www.npmjs.com/package/csv-parser), Node and npm, obviously.

- clone repo `git clone https://github.com/kasperwf/csv2json.git`
- `npm install`

done :)

## Usage

`$ node index --file=<input.csv> --out=<output.json> --frh`

## Parameters

`--file` CSV file to convert

`--out` Result JSON file

`--frh` First Row is Header (*optional*)


## Syntax of input file

### With `--frh` parameter

See [example01_frh.csv](./example01_frh.csv) and [example01_frh.json](./example01_frh.json)

*input CSV:*

itemno        | category      | age   | sex
------------- | ------------- |------ | ------
67734         | tshirts       | 18    | girl
98347         | pants         | 19    | boy

*output JSON:*

```json
[
  {
    "itemno": "67734",
    "category": "tshirts",
    "age": 18,
    "sex": "girl"
  },
  {
    "itemno": "98347",
    "category": "pants",
    "age": 19,
    "sex": "boy"
  }
]
```

### Without `--frh` parameter

See [example02.csv](./example02.csv) and [example02.json](./example02.json)

*input CSV:*

KEY | en | da
--- | --- | ---
addtocart | Add to cart | Put i kurv
proceedtocheckout | Go to checkout | Gå til betaling
tax | Tax | Moms
price | price | pris


*output JSON:*

```json
{
  "en": {
    "addtocart": "Add to cart",
    "proceedtocheckout": "Go to checkout",
    "tax": "Tax",
    "price": "price"
  },
  "da": {
    "addtocart": "Put i kurv",
    "proceedtocheckout": "Gå til betaling",
    "tax": "Moms",
    "price": "pris"
  }
}
```



