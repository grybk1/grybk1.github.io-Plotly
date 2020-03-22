
const url = "samples.json";
data=d3.json(url)


//Populate dropdown select
d3.json(url).then(function(data){
   // console.log(data)
   // console.log(data.names)
    var data=data.names
    var select = d3.select('#selDataset')
    var options = select
      .selectAll('option')
        .data(data).enter()
        .append('option')
        .text(function (d) { return d; });
});


function optionChanged(inputValue) {
    console.log(inputValue)
    d3.json(url).then(function(data){
        var sample=data.samples;
        var data=data.metadata;
    
    console.log(data)
    console.log(sample)
    console.log(inputValue)
    for( var i=0; i<data.length; i++){
        console.log("dataId:"+data[i].id)
      //  console.log("input value:"+inputValue)

   // data.forEach(data => {
        if(data[i].id===parseInt(inputValue,10)){
            console.log("INPUT VALUE: "+inputValue);
            d3.select("#sample-metadata")
             .html("id: "+data[i].id+"<br>"+
                "ethnicity: "+data[i].ethnicity+"<br>"+
                "gender: "+data[i].gender+"<br>"+
                "age: "+data[i].age+"<br>"+
                "location: "+data[i].location+"<br>"+
                "bbtype: "+data[i].bbtype+"<br>"+
                "wrfreq: "+data[i].wfreq);

// grab larger dataset for bubble chart
                let full_otus=sample[i].otu_ids
                let full_otuValues= sample[i].sample_values
                let full_tuTips=sample[i].otu_labels
                let full_otuLabels=[];

                
// dataset for bar chart
                let otus=sample[i].otu_ids.slice(0, 10)
                // outus='test '+outus
                //let otus=sample[0].otu_labels.slice(0, 10)
                let otuValues= sample[i].sample_values.slice(0, 10) 
                let otuTips=sample[i].otu_labels.slice(0, 10)
                let otuLabels=[];
                for(i=0;i<full_otus.length;i++){
                    otuLabels.push('otu - '+ otus[i] );
              //      console.log(otuLabels);                
             } 
// BAR CHART TRACE             
             var trace1 = {
                y: otuLabels,
                x: otuValues,
                type: "bar",
                orientation: "h",
                text: otuTips,
                //hovertext: otuTips,
                //hoverinfo:otuTips,
                marker: {
                //  color: 'rgb(142,124,195)'
                  color: 'lightblue'
                }
              };

              var data = [trace1];
      
              var layout = {
                title: 'Volume by OTU',
                width: 800,
                font:{
                  family: 'Raleway, sans-serif'
                },
                showlegend: false,
                xaxis: {
                  tickangle: -45
                },
                yaxis: {
                  zeroline: false,
                  gridwidth: 2
                },
                bargap :0.05
              };
              Plotly.newPlot("bar", data, layout);
//BUBBLE CHART

var desired_maximum_marker_size = 40;
var trace2 = {
  x: full_otus,
  y:full_otuValues,
  text: otuLabels,
  mode: 'markers',
  marker: {
    color: full_otus,
    size: full_otuValues,
//    sizeref: 2.0 * Math.max(full_otuValues) / (desired_maximum_marker_size**2),
//    sizemode: 'area' 
  }
};
var data2 = [trace2];
    
var layout2 = {
  title: 'Full OTU Data Set for ID: '+inputValue,
  showlegend: true,
  height: 600,
  width: 1000
};
Plotly.newPlot("bubble", data2, layout2);
    
//END OF BUBBLE CHARE




            }
        }    
    //});
});
}

   

