import React, { Component, useEffect, useState } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Header, Content, Left, Right, Body, Icon, Text, Card, CardItem, Input, Item, Button } from 'native-base';

export default class AnatomyExample extends Component {
  state = {
    data: []
  }

  getData() {
    fetch('https://api.coronatracker.com/news/trending?limit=20&country=Malaysia&countryCode=MY')
    .then((response) => response.json())
    .then(json => {
        this.setState({ data: json.items });
    });
  }

  componentDidMount() {
    this.getData()
  }

  searchByTitle (text) {
    if (text == '') {
      this.getData()
    } else {
      updatedList = this.state.data.filter(item => item.title.includes(text))
      this.setState({ data: updatedList });
    }
  }

  openlink(url) {
    Linking.openURL(url)
  }

  render() {
    return (
        <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => this.searchByTitle(text)} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
      {this.state.data.map((item) => (
          <Card key={item.nid}>
          <CardItem cardBody>
              <Image source={{uri: item.urlToImage }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                    <Text>{item.title}</Text>
                    <Text note>{item.description}</Text>
                    
                </Body>
              </Left>
              
            </CardItem>
            <CardItem>
            <Left/>
            <Right>
                <Body>
                  <Button transparent onPress={() =>this.openlink(item.url)}>
                      <Text>READ MORE</Text>
                    </Button>
                </Body>
              </Right>
            </CardItem>
            
          </Card>
    ))}
    </Content>
  </Container>
      
    );
  }
}