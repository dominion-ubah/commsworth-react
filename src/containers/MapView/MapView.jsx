import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import MarkersOnMap from 'markers-on-map-react';
import { GOOGLE_API_KEY } from 'helpers/constants';
import { Row, Col, Card } from 'antd';
import Header from 'components/Header/Header';

class MapView extends Component {
  
  componentDidUpdate(prevProps ) {
    let { loadLocations } = this.props
    console.log("loadlocs", loadLocations.loadLocations)
    if(prevProps !== this.props) {
      MarkersOnMap.Init({
        googleApiKey: GOOGLE_API_KEY, // required => Google Maps JavaScript API Key (in string format)
        markerObjects: loadLocations?loadLocations.loadLocations.map(marker => {
          return  {
            markerLat:  parseInt(marker.latitude),
            markerLong: parseInt(marker.longitude),
            markerTitle: marker.location, // optional => marker title
            markerLabelText: marker.location, // optional => if "markerLabel.usaLabel" is true
            markerContent: ()=> (<div>{marker.location}</div>), // optional => custom html content infowindow when marker clicked
          }
        }):[],
      });
      // Basic initialize
      // Select map element (ID or Class)
      MarkersOnMap.Run('div#GoogleMap');

    }
  }
    
    render() {
        console.log('props', this.props)
        return (
          <div>
              <Header />
              <Row type="flex" >
                <Col  span={12}>
                  <div id="GoogleMap"></div>  
                </Col>
                <Col  span={12}>
                  <Row gutter={16}> 
                  <Query query={loadLocations} >
                    {({ loading, error, data }) => {
                    if (loading) return <p>Loading…</p>;
                    if (error) return <p>Error :(</p>;
                    return data.loadProject.sort((a,b)=> b.id - a.id).map(({ budget, startDate,  endDate, title }, i) => (
                          <div key={i}>
                      <Col span={8}>
                        <Card title={"Project Title: "+title} bordered={false}>
                          <h3><strong> </strong></h3>
                          <p><strong>Time Frame: </strong>{`${startDate}: ${endDate}`}</p>
                          <p><strong>Budget($): </strong>{`${budget}`}</p>
                        </Card>
                      </Col>
                          </div>
                    ));
                    }}
                  </Query>
                  </Row> 
                </Col>
              </Row>
          </div>
        );

    }
}

MapView.defaultName = 'MapViewPage';

export default graphql(loadLocations, {name: 'loadLocations'})(MapView);

const loadLocations = gql`
{
  loadLocations{
      location
      longitude
      latitude
    }
    loadProject{
      budget
      endDate
      id
      startDate
      title
    }
}`;