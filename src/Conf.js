import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Form, Grid, Header, Image, Message, Segment,Card } from 'semantic-ui-react';

class Conf extends Component {
    constructor(props){
        super(props);
        this.error={data:''};
        this.conf={host:'localhost',dbname:'',port:0,user:'root',pass:''};
    }

    jalan(e){
        var fs=require('fs');
        if(1000<=this.conf.port&&''!==this.conf.dbname&&''!==this.conf.host&&''!==this.conf.user&&''!==this.conf.pass){
            fs.writeFile('dbkonf',JSON.stringify(this.conf),function(e){
                if(!e){
                    var mysql=require('mysql');
                    var ene=null;
                    var c=mysql.createConnection({host:this.conf.host,port:this.conf.port,database:this.conf.dbname,user:this.conf.user,password:this.conf.pass});
                    c.connect();
                    c.query('create table resep(nama varchar(25)primary key,jenis varchar(10)not null,gbr text not null,ket text not null)',function(e,r,f){if(e)ene=e;});
                    c.query('create table bahan(resep varchar(25)not null,nama varchar(20)not null,jum float not null,satuan varchar(20)not null)',function(e,r,f){if(e)ene=e;});
                    c.query('create table langkah(resep varchar(25)not null,urut int not null,stepe text not null)',function(e,r,f){if(e)ene=e;});
                    c.query('alter table bahan add foreign key(resep)references resep(kode)on update cascade on delete cascade',function(e,r,f){if(e)ene=e;});
                    c.query('alter table langkah add foreign key(resep)references resep(kode)on update cascade on delete cascade',function(e,r,f){if(e)ene=e;});
                    c.end();
                    if(!ene)window.location.href='index.html';
                }
            });
        }
    }

    render() {
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <img src={logo}/>{' '}Konfigurasi Basis Data
            </Header>
            <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='desktop' iconPosition='left' placeholder='Host' value={this.conf.host}/>
                    <Form.Input fluid icon='plug' iconPosition='left' placeholder='Port' value={this.conf.port}/>
                    <Form.Input fluid icon='database' iconPosition='left' placeholder='Nama Database' value={this.conf.dbname}/>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Host' value={this.conf.user}/>
                    <Button color='teal' fluid size='large' onClick={this.jalan}>Login</Button>
                </Segment>
            </Form>
            <Message negative>
                <Message.Header>{this.error.data}</Message.Header>
            </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Conf;