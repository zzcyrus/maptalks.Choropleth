# maptalks-plugin-Choropleth

A small maptalks plugin to Choropleth (color scale based on value), based on [Leaflet.choropleth](https://github.com/timwis/leaflet-choropleth) by timwis

![](https://raw.githubusercontent.com/zzcyrus/readme_demo/master/img/maptalks.Choropleth.demo.png)

## Examples

[Demo](http://kael.top/maptalks.Choropleth/demo/demo.html)

## Install

Just include the maptalks-Choropleth.js/maptalks-Choropleth.min.js from the dist folder:
```
<script src="maptalks-Choropleth.js"></script>
```

## Usage

```js
var choropleth = new maptalks.Choropleth('choropleth', geojson, {
    valueProperty: 'incidents', 
    scale: ['white', 'red'], 
    steps: 5,
    mode: 'q', 
    style: {
        lineColor: '#fff', 
        lineWidth: 2, 
        polygonOpacity: 0.8
    }
}).addTo(map);
```


## `Constructor`
```javascript
new maptalks.Choropleth(id, geojson, options)
```

* id **String** layer id
* geojson **String|Object|Object[]**  GeoJSON objects or GeoJSON string
* options **Object** options
    * valueProperty **String** which property in the features to use ('value' by default) 
    * scale  **String[]** chroma.js scale - include as many as you like (['white', 'red'] by default)
    * steps **Number**  number of breaks or steps in range (5 by default)
    * mode **String** q for quantile, e for equidistant, k for k-means ('q' by default)
    * style **Object** maptalks.Layer support style options (demo as reference)

* more infomation please check [maptalks.Layer](https://maptalks.github.io/maptalks.js/api/0.x/Layer.html)