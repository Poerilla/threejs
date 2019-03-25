Visualizing network packet data using three.js,
The name of the company is Cybernetiq, which (as interpreted by this developer) is a portmanteau of the words Skynet and Cyberdyne. In that spirit this little project is called "The Resistance", because as cyber security analysts we are the good guys!

## Run project
### run server
'''node server.js'''
follow the url provided in the command prompt or follow this -> [link here](http://localhost:9000/index.html)

Alternatively, open the html file in browser - packet_visuals.html
Refresh the page to start it again. 
---
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
---
## Work done so far
1. Selected visualization technique using the IcosahedronGeometry geometry. 
* Node status interpretation.
```
 Fluorescent color is for when the node is transmitting 
 The default color depicts a node which is in it's resting state and possibly receiving packets. This is done because as there are only two active nodes there is no need to highlight or emphasize any nodes receiving packets.
 ```
![alt text](./transmittingNode.png "Node highlighted in green transmitting a packet")

* The color of the cell, which is the dot, determines the protocol being used.
```
 Green is for TCP
 Yellow is for CCMP
```
2. Select metric or variable to tie to json data 
* Circle mesh color of vertices. Inner "cell" mesh and the outer "wireframe" mesh
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
* Could be just how JavaScript handles floating point numbers. A possible solution would be to convert it all to integers and deal with each time interval separately and designate a single tic of the clock to the smallest difference within the data. Make is pseudo-real-time!
5. TODO: Animate connected lines in ```update()``` loop.
## Possible improvements or additions
1. Finish the line coloring to show node pairs that are communicating during each socket session
2. Allow for mouse over text so node IP addresses or pertinent metadata can be seen on mouse over
## Lessons learnt 
1. The time factor. Address platform specific issues when dealing with time measurements. The way floating point numbers are represented in JavaScript does not provide for great precision and the time steps are not guaranteed to be equal between each tic of the clock.
---
### Hours put in 
* Monday 18th March - 4 hrs.’: Learning threejs, pcap data analysis, selecting a geometry and beginning 
* Tuesday 18th March - 30 minutes: Synchronizing time
* Monday morning 25 March - 3 hours: Finalizing functionality and adjusting visuals for demonstration purposes and documenting code
