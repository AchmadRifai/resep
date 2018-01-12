import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Form, Grid, Header, Image, Message, Segment,Card } from 'semantic-ui-react';

class Conf extends Component {
    state={error:{data:''},conf:{host:'localhost',port:'3306',database:'',user:'root',password:''}};
    handleChange = (e, {name, value} ) => this.setState( { [name] : value } )
    jalan=()=>{
        const{error,conf}=this.state
		const fs=require('fs');
		const mysql=require('mysql');
        if(1000<=conf.port&&''!==conf.dbname&&''!==conf.host&&''!==conf.user){
            fs.writeFile('dbkonf',JSON.stringify(conf),function(e){
                var c=mysql.createConnection({host:conf.host,port:conf.port,database:'mysql',user:conf.user,password:conf.password});
            c.connect();
            c.query('create database if not exists '+conf.database,function(e,r,f){});
            c.end();
            c=mysql.createConnection(conf);
            c.connect();
            c.query('create table if not exists resep(nama varchar(25)primary key,jenis varchar(10)not null,gbr text not null,ket text not null)',
            function(e,r,f){});
            c.query('create table if not exists bahan(resep varchar(25)not null,nama varchar(20)not null,jum float not null,satuan varchar(20)not null)',
            function(e,r,f){
                c.query('alter table bahan add foreign key(resep)references resep(kode)on update cascade on delete cascade',function(e,r,f){});
            });
            c.query('create table langkah(resep varchar(25)not null,urut int not null,stepe text not null)',
            function(e,r,f){
                c.query('alter table langkah add foreign key(resep)references resep(kode)on update cascade on delete cascade',function(e,r,f){});
            });c.end();
            window.location.reload();
            });
        }else alert('Tolong Diisi Semua!');
    }

    render() {
        const{error,conf}=this.state
    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <img src={logo}/>{' '}Konfigurasi Basis Data
            </Header>
            <Form size='large' onSubmit={this.jalan}>
                <Segment stacked>
                    <Form.Input fluid icon='desktop' iconPosition='left' placeholder='Host *' defaultValue={conf.host} onChange={this.handleChange}/>
                    <Form.Input fluid icon='plug' iconPosition='left' placeholder='Port *' defaultValue={conf.port} onChange={this.handleChange}/>
                    <Form.Input fluid icon='database' iconPosition='left' placeholder='Nama Database *' defaultValue={conf.database}
					onChange={this.handleChange}/>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Host *' defaultValue={conf.user} onChange={this.handleChange}/>
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' defaultValue={conf.password} onChange={this.handleChange}
            type="password"/>
                    <Button color='teal' fluid size='large'>Login</Button>
                </Segment>
            </Form>
            <Message negative>
                <Message.Header>{error.data}</Message.Header>
            </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Conf;