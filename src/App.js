import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form, Grid, Header, Image, Message, Segment,Card } from 'semantic-ui-react';

var mysql=require('mysql');

class App extends Component {
    constructor(props){
        super(props);
        var fs=require('fs');
        fs.readFile('dbkonf',function(e,d){
            var conf=JSON.parse(d.toString());
            var c=mysql.createConnection({host:conf.host,port:conf.port,database:conf.dbname,user:conf.user,password:conf.pass});
            var v=null;
            c.query('select*from resep',function(e,r,f){
                v=r;
            });this.nilai=v;
            c.end();
        });
    }

    render() {
    return (
        <Card.Group>
            {this.nilai.map((d,i)=><Kartu key={i} d={d}/>)}
        </Card.Group>
    );
  }
}
class Kartu extends Component{
    render(){
        return(
            <Card image={this.props.d.gbr} header={this.props.d.nama} meta={this.props.d.jenis} description={this.props.d.ket}>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default App;