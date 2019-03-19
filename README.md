# threejs
Visualizing network packet data using three.js

## Sample Data Packet

```javascript
  {
    "No.": 1,
    Time: 0,
    Source: "192.168.2.101",
    Destination: "211.137.137.11",
    Protocol: "TCP",
    Length: 76
  };
```
## Work done so far
1. Selected visualization technique using the IcosahedronGeometry geometry. 
2. Select metric or variable to tie to json data 
* Circle mesh color of virtices. Inner "cell" mesh and the outer "wireframe" mesh
3. Analyze data using D3 to view the data using graphs
```javascript
      //Group the data by source
      let dataBySource = d3
        .nest()
        .key(function(d) {
          return d.Source;
        })
        .entries(data);
      console.log(dataBySource);
 ```
4. Synchronize internal clock with packet Time variable (in progress).
* Select time within a certain window
* The issue here is that the packet data arrives faster than the browsers internal clock is able to keep up with. That is for every tic of the browsers clock more than one packet would have arrived.
5. TODO: Animate changes in ```update()``` loop.
6. TODO: Document code

### Hours put in
Monday 18th March - 4 hrs.
Tuesday 18th March - 30 minutes
