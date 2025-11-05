function renderPie(summary){
  Highcharts.chart('pie-total', {
    chart: { type:'pie', backgroundColor:'transparent' },
    title: { text: 'Population COVID Status' },
    tooltip: { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)' },
    accessibility: { point: { valueSuffix: '%' } },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}' }
      }
    },

    series: [{
    name: 'Count',
    data: [
      ['Affected', summary.affected],
      ['Cured', summary.cured],
      ['Not Affected', summary.notAffected],
      ['Death', summary.death]
      ]
    }]
  });
}

Highcharts.setOptions({
  chart: {
    backgroundColor: 'transparent',
    style: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }
  },
  title: { style: { color: '#0a111f', fontWeight: '600' } },
  xAxis: {
    lineColor: 'rgba(0,0,0,0.08)',
    tickColor: 'rgba(0,0,0,0.08)',
    labels: { style: { color: '#0a111f' } }
  },
  yAxis: {
    gridLineColor: 'rgba(0,0,0,0.08)',
    labels: { style: { color: '#0a111f' } },
    title: { style: { color: '#0a111f' } }
  },
  legend: { itemStyle: { color: '#0a111f' } },
  credits: { enabled: false },
  colors: ['#20c997', '#4dbd74', '#ffc107', '#e55353', '#42e2f4', '#6366f1']
});


// function renderPie(summary){
//   Highcharts.chart('pie-total', {
//     chart: { type:'pie' },
//     title: { text: 'Population COVID Status' },
//     tooltip: { pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)' },
//     plotOptions: {
//       pie: {
//         innerSize: '55%',                // donut style
//         dataLabels: {
//           enabled: true,
//           formatter: function () {
//             if (this.y === 0) return null;
//             return `<b>${this.point.name}</b><br/>${this.y} • ${Highcharts.numberFormat(this.percentage, 1)}%`;
//           },
//           style: { color: '#0a111f', textOutline: 'none' }
//         },
//         showInLegend: true
//       }
//     },
//     series: [{
//       name: 'Count',
//       data: [
//         { name:'Affected',      y: summary.affected,     color:'#e55353' },
//         { name:'Cured',         y: summary.cured,        color:'#42e2f4' },
//         { name:'Not Affected',  y: summary.notAffected,  color:'#4dbd74' },
//         { name:'Death',         y: summary.death,        color:'#343a40' }
//       ]
//     }]
//   });
// }

function renderPie(summary){
  // Ensure total > 0 to avoid div-by-zero
  const total = summary.total || (summary.affected + summary.cured + summary.notAffected + summary.death) || 0;
  const safePercent = (n) => total ? (n/total*100) : 0;

  Highcharts.chart('pie-total', {
    chart: { type:'pie', backgroundColor:'transparent' },
    title: { text: 'Population COVID Status' },
    tooltip: { pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)' },
    accessibility: { point: { valueSuffix: '%' } },
    plotOptions: {
      pie: {
        innerSize: '52%',
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          formatter() {
            if (this.y === 0) return null;
            return `<b>${this.point.name}</b><br/>${this.y} — ${Highcharts.numberFormat(this.percentage,1)}%`;
          },
          style: { color: '#0a111f', textOutline: 'none' }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Count',
      data: [
        { name:'Affected',      y: summary.affected,     color:'#e55353' },
        { name:'Cured',         y: summary.cured,        color:'#42e2f4' },
        { name:'Not Affected',  y: summary.notAffected,  color:'#4dbd74' },
        { name:'Death',         y: summary.death,        color:'#343a40' }
      ]
    }],
    credits: { enabled: false }
  });
}

function renderDeathsByState(entries) {
  // entries = [ [state, count], ... ]
  Highcharts.chart('chart-deaths-state', {
    chart: { type: 'column' },
    title: { text: 'Deaths by State (Top 10)' },
    xAxis: { categories: entries.map(e => e[0]) },
    yAxis: { min: 0, title: { text: 'Deaths' }, allowDecimals: false },
    tooltip: { pointFormat: '<b>{point.y}</b> death(s)' },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.08,
        groupPadding: 0.12,
        dataLabels: {
          enabled: true,
          style: { color:'#0a111f', textOutline:'none', fontWeight: 600 }
        }
      }
    },
    series: [{
      name: 'Deaths',
      color: '#343a40',
      data: entries.map(e => e[1])
    }]
  });
}

// function renderIndiaMap(stateCounts) {
//   fetch('assets/maps/in-all.geo.json')
//     .then(r => r.json())
//     .then(mapData => {
//       const data = Object.entries(stateCounts).map(([state, value]) => ({ name: state, value }));

//       Highcharts.mapChart('india-map', {
//         chart: { map: mapData },
//         title: { text: 'Affected by State' },
//         mapNavigation: { enabled: true, enableButtons: false },
//         tooltip: {
//           pointFormatter: function() {
//             const v = this.value || 0;
//             return `<span style="font-weight:600">${this.name}</span><br/>Affected/Cured: <b>${v}</b>`;
//           }
//         },
//         colorAxis: {
//           min: 0,
//           stops: [
//             [0,   '#e8f7f1'], // very low
//             [0.5, '#ffc107'], // mid
//             [1,   '#b71c1c']  // high
//           ]
//         },
//         series: [{
//           data,
//           name: 'Affected',
//           states: { hover: { color: '#BADA55' } },
//           dataLabels: { enabled: false },
//           joinBy: 'name'
//         }]
//       });
//     })
//     .catch(err => {
//       console.error('Map load error:', err);
//       document.getElementById('india-map').innerHTML =
//         '<div class="text-danger p-3">⚠️ Unable to load India map.</div>';
//     });
// }

// helper to transform {state:count} into Highcharts map data
function stateCountsToMapData(mapCounts, mapDataGeo) {
  // mapCounts: { stateName: count, ... }
  // Need to pair by name that matches geojson features' 'name' property.
  return Object.entries(mapCounts).map(([name, val]) => ({ name, value: val || 0 }));
}

// Render three maps side-by-side: affected, cured, death
function renderIndiaMaps(stateCountsObj) {
  // stateCountsObj = { affected: {...}, cured: {...}, death: {...} }

  fetch('assets/maps/in-all.geo.json')
    .then(r => r.json())
    .then(mapData => {
      const makeData = (obj) =>
        Object.entries(obj || {}).map(([state, val]) => ({ name: state, value: val || 0 }));

      const affectedData = makeData(stateCountsObj.affected);
      const curedData = makeData(stateCountsObj.cured);
      const deathData = makeData(stateCountsObj.death);

      // factory function for each map
      function makeMapOptions(titleText, data, stops) {
        return {
          chart: {
            map: mapData,
            backgroundColor: 'transparent',
            height: 240,
            margin: [0, 0, 0, 0]
          },
          title: { text: titleText, style: { color: '#0a111f', fontSize: '14px' } },
          mapNavigation: {
            enabled: true,
            enableButtons: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          navigation: {
            buttonOptions: {
              align: 'right',
              verticalAlign: 'bottom',
              theme: { stroke: '#ccc' }
            }
          },
          tooltip: {
            useHTML: true,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#ccc',
            formatter() {
              const v = this.point.value || 0;
              return `<strong>${this.point.name}</strong><br/>Cases: <b>${v}</b>`;
            }
          },
          colorAxis: {
            min: 0,
            stops: stops,
            labels: { style: { color: '#0a111f', fontSize: '10px' } }
          },
          series: [
            {
              data,
              joinBy: 'name',
              name: titleText,
              states: { hover: { color: '#e0e7ff' } },
              dataLabels: { enabled: false }
            }
          ],
          credits: { enabled: false }
        };
      }

      // render each map with its color range
      Highcharts.mapChart(
        'india-map-affected',
        makeMapOptions('Affected Cases', affectedData, [
          [0, '#fff5f5'],
          [0.5, '#ff9999'],
          [1, '#b71c1c']
        ])
      );

      Highcharts.mapChart(
        'india-map-cured',
        makeMapOptions('Cured Cases', curedData, [
          [0, '#f0fdf4'],
          [0.5, '#86efac'],
          [1, '#15803d']
        ])
      );

      Highcharts.mapChart(
        'india-map-death',
        makeMapOptions('Deaths', deathData, [
          [0, '#f9fafb'],
          [0.5, '#a3a3a3'],
          [1, '#171717']
        ])
      );
    })
    .catch((err) => {
      console.error('Map load error:', err);
      ['india-map-affected', 'india-map-cured', 'india-map-death'].forEach((id) => {
        const el = document.getElementById(id);
        if (el)
          el.innerHTML =
            '<div class="text-danger p-3">⚠️ Unable to load India map.</div>';
      });
    });
}



function renderAgeChart(buckets){
  Highcharts.chart('age-chart', {
    chart: { type:'column' },
    title: { text: 'Age Distribution' },
    xAxis: { categories: Object.keys(buckets), title: { text: null } },
    yAxis: { min:0, title: { text: 'Patients' } },
    tooltip: { pointFormat: '<b>{point.y}</b> patient(s)' },
    plotOptions: {
      column: {
        color: '#20c997',
        borderRadius: 4,
        dataLabels: {
          enabled: true,
          formatter() { return this.y || null; },
          style: { color:'#0a111f', textOutline:'none', fontWeight: 600 }
        }
      }
    },
    series: [{ name:'Count', data:Object.values(buckets) }]
  });
}