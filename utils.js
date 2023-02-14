let cu = _.range(0,70);

let oi = 1;

let rot_x = [];
let rot_y = [];
let rot_z = [];

$("#btnImportSpeed").change(function() {
    let file = $('#btnImportSpeed')[0].files[0]
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            readSpeedData(e.target.result);
            setup()
            draw()
        };
    }
});

function readSpeedData(data) {
    let allSpeeds = [];
    let all_acellx = [];
    let all_acelly = [];
    let all_acellz = [];
    let all_orientx = [];
    let all_orienty = [];
    let all_orientz = [];

    $(data.split("\r\n")).each(function(index) {
        if (index%2 == 0){
            let line = this.split(";");
            let speed = line[0];
            let speed2 = line[1];
            let speed3 = line [2];
    
            // console.log(speed2);
            let acel = Math.sqrt( speed*speed + speed2*speed2);
            // console.log(acel);

            allSpeeds.push({
                "x": index,
                "y": parseFloat(acel)
            });
            all_acellx.push({
                "x": index,
                "y": parseFloat(speed)
            });
            all_acelly.push({
                "x": index,
                "y": parseFloat(speed2)
            });
            all_acellz.push({
                "x": index,
                "y": parseFloat(speed3)
            });
        } else {

            let line = this.split(";");

            let orientx = line[0];
            rot_x.push(line[0]*3.14/180)

            let orienty = line[1];
            rot_y.push(line[1]*3.14/180)

            let orientz = line [2];
            rot_z.push(line[2]*3.14/180)
            console.log(rot_z)
            // console.log(orientx);
            // console.log(orienty);
            // console.log(orientz);
         
            all_orientx.push({
                "x": index,
                "y": parseFloat(orientx)
            });
            all_orienty.push({
                "x": index,
                "y": parseFloat(orienty)
            });
            all_orientz.push({
                "x": index,
                "y": parseFloat(orientz)
            });
        }
    });

    createChartAcel(allSpeeds, all_acellx, all_acelly, all_acellz);
    createChartOrient(all_orientx, all_acelly, all_acellz);
}

function createChartAcel(speeds, acelx, acely, acelz) {
    console.log(speeds)
    const labels = [];
    for (let i = 0; i < speeds.length; ++i) {
        labels.push((i / 5.0).toString());
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Axel x',
                data: acelx,
                borderColor: "rgb(255, 255, 0)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            },
            
            {
                label: 'Axel y',
                data: acely,
                borderColor: "rgb(255, 0, 0)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            },

            {
                label: 'Axel z',
                data: acelz,
                borderColor: "rgb(255, 0, 255)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            }
            
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temps (s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Coordonnées (mm/s^2)'
                    }
                }
        
            }
        },
      };

    const ctx = document.getElementById("graphAcel_axes");
    const myChart = new Chart(ctx, config);

    const data_mod = {
        labels: labels,
        datasets: [
            {
                label: 'Mod Acel',
                data: acelx,
                borderColor: "rgb(255, 0, 0)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            }        
                   
        ]
    };

    const config_mod = {
        type: 'line',
        data: data_mod,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temps (s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Coordonnées (mm/s^2)'
                    }
                }
        
            }
        },
      };

    const ctx_mod = document.getElementById("graphSpeed");
    const myChart_mod = new Chart(ctx_mod, config_mod);
  
}

function createChartOrient( acelx, acely, acelz) {
    const labels = [];
    for (let i = 0; i < acelx.length; ++i) {
        labels.push((i / 5.0).toString());
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Axel x',
                data: acelx,
                borderColor: "rgb(255, 255, 0)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            },
            
            {
                label: 'Axel y',
                data: acely,
                borderColor: "rgb(255, 0, 0)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            },

            {
                label: 'Axel z',
                data: acelz,
                borderColor: "rgb(255, 0, 255)",
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
                
            }
            
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temps (s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Coordonnées (degres)'
                    }
                }
        
            }
        },
      };

    const ctx = document.getElementById("graphOrient");
    const myChart = new Chart(ctx, config);

}


function initMap(){
    var pos_centrale = {lat:50.606075, lng:3.136282};
    // map options
    var options = {
        zoom:13,
        //center: {lat: -3.755587, lng:-38.548890} 
        center: pos_centrale
    }

   // new map
    var map = new 

    google.maps.Map(document.getElementById('containerPosition'), options);

  // add marker 
    var marker = new google.maps.Marker({
    position:pos_centrale,
    map:map,


});

} 



function init2Map() {

    const locations = [
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
      ];

    const map = new google.maps.Map(document.getElementById("containerPosition"), {
      zoom: 3,
      center: { lat: -28.024, lng: 140.887 },
    });
    
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        label,
      });
  
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });
      return marker;
    });
  
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({ markers, map });
}
  

  
// window.initMap = initMap;


function setup() {
    let mycanvas = createCanvas(300, 300, WEBGL);
    mycanvas.parent('containerTeste3D');
 
    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height) / 2;
    // cnv.position(x, y);
    console.log(cu.length);
    drawingContext.shadowColor = "black";
  
    // describe('a white box rotating in 3D space');
  }
  
  function draw() {
    // oi = dedo[oi]
    background(100);


  
    
    rotateX(rot_x[oi]);
    rotateY(rot_y[oi]);
    rotateZ(rot_z[oi]);
    // rotateX(0.01*cu[oi]);
    // rotateY(0.01*cu[oi]);
    // rotateZ(0.1*cu[oi]);
    box(110, 60, 10);
   if (frameCount%13==0){oi = oi + 1;   
   };
    
    if (oi == rot_x.length    ){oi = 1};
    
    
  
  }


$("#btnPlay").change(function() {


    
});

$("#btnImportOrient").change(function() {
    
});

$("#btnImportAcel_axes").change(function() {
    let file = $('#btnImportAcel_axes')[0].files[0]
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            readSpeedData(e.target.result);
        };
    }
    
});