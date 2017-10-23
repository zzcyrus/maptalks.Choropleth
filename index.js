import * as maptalks from 'maptalks';
import chroma from 'chroma-js';

const choroplethOptions = {
    valueProperty: 'value',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q'
};

function ChoroplethGeometries(geojson, opts) {
    // Calculate limits
    const values = geojson.features.map(
        typeof opts.valueProperty === 'function' ?
            opts.valueProperty :
            function (item) {
                return item.properties[opts.valueProperty];
            });
    const limits = chroma.limits(values, opts.mode, opts.steps - 1);

    // Create color buckets
    const colors = (opts.colors && opts.colors.length === limits.length ?
        opts.colors :
        chroma.scale(opts.scale).colors(limits.length));
    const geometries = maptalks.GeoJSON.toGeometry(geojson);
    for (let index = 0; index < geometries.length; index++) {
        const opt = {
            polygonFill: null,
            polygonOpacity: opts.style.polygonOpacity || 0.8,
            lineColor: opts.style.lineColor || '#fff',
            lineWidth: opts.style.lineWidth || 2
        };
        const props = geometries[index].getProperties();
        const featureValue = props[opts.valueProperty];
        if (!isNaN(featureValue)) {
            // Find the bucket/step/limit that this value is less than and give it that color
            for (let i = 0; i < limits.length; i++) {
                if (featureValue <= limits[i]) {
                    opt.polygonFill = colors[i];
                    break;
                }
            }
            geometries[index].setSymbol(opt);
        }
    }
    return geometries;
}

export class Choropleth extends maptalks.VectorLayer {

    /**
     * @param {String|Number} id - layer's id
     * @param {String|Object|Object[]} [geojson=null] - geojson to add
     * @param {Object}  [options=null]          - construct options
     */
    constructor(id, geojson, options) {
        const geometries = ChoroplethGeometries(geojson, options);
        super(id, geometries, options);
    }

}

Choropleth.mergeOptions(choroplethOptions);

Choropleth.registerJSONType('Choropleth');
