import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Container, Divider, Dropdown, Grid, Header, List, Menu, Segment } from 'semantic-ui-react';
import { Button, Form, Image, Message,Card,Modal,Icon,Radio,Confirm } from 'semantic-ui-react';

const serverPusat='http://localhost:2101';

class ModalAdd extends Component{
  state = {kode:'',nama:'',ket:null,gbr:null,jenis:'makanan'}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const{kode,nama,ket,gbr,jenis}=this.state;
    if(!kode&&!nama&&!ket&&!gbr&&!jenis)axios.post(serverPusat+'/add/resep',
    {kode:kode,nama:nama,ket:ket,gbr:gbr,jenis:jenis}).then((res)=>{
      if(!res.data.data.error)window.location.reload();
      else this.setState({kode:'',nama:'',ket:null,gbr:null,jenis:'makanan'});
    });
  }

  render(){
    const{kode,nama,ket,gbr,jenis}=this.state;
    return (
      <Modal trigger={<Button>Tambah Resep</Button>} basic>
        <Modal.Header>Form Penambahan Resep</Modal.Header>
        <Header icon='plus' content='Form Penambahan Resep' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
            <p><Form.Input placeholder='Kode Masakan' name='kode' defaultValue={kode} onChange={this.handleChange}/></p>
            <p><Form.Input placeholder='Nama Masakan' name='nama' defaultValue={nama} onChange={this.handleChange}/></p>
            <p><Form.Input placeholder='keterangan Masakan' name='ket' defaultValue={ket} onChange={this.handleChange} type='file' accept='text/*'/></p>
            <p><Form.Input placeholder='Gambar Masakan' name='gbr' defaultValue={gbr} onChange={this.handleChange} type='file' accept='image/*'/></p>
            <p>
              <Form.Field>
                <Radio label='Makanan' value='makanan' name='jenis' checked={jenis==='makanan'} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <Radio label='Minuman' value='minuman' name='jenis' checked={jenis==='minuman'} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <Radio label='Camilan' value='camilan' name='jenis' checked={jenis==='camilan'} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <Radio label='Sayuran' value='vegetable' name='jenis' checked={jenis==='vegetable'} onChange={this.handleChange}/>
              </Form.Field>
            </p>
            <Form.Button content='Submit' />
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state={resepe:[]};
    }

    componentDidMount(){
      axios.get(serverPusat+'/').then((res)=>{
        this.setState({resepe:res.data.data});
      })catch((e)=>{console.log(e);});
    }

    render() {
    return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image style={{ marginRight: '1.5em' }} src={logo}/> Resep Masakan
            </Menu.Item>
            <Menu.Item as='a'>
              {ModalAdd}
            </Menu.Item>
          </Container>
        </Menu>
        <Card.Group>
            {this.state.resepe.map((d,i)=><Kartu key={i} d={d}/>)}
        </Card.Group>
    );
  }
}
class Kartu extends Component{
  this.state={bahan:[],langkah:[],akanHapus:false};

  show = () => this.setState({ akanHapus: true })

  cancel=()=>this.setState({ akanHapus: false })

  confirmed=()=>{
    axios.post(serverPusat+'/delete/resep',{kode:this.props.d.kode}).then((res)=>{
      if(!res.error)window.location.reload();
    });
  }

  componentDidMount(){
    axios.get(serverPusat+"/bahan/"+this.props.d.kode).then((res)=>{
      //
    });
  }

    render(){
        return(
            <Card image={serverPusat+'/gbr/'+this.props.d.kode} header={this.props.d.nama} meta={this.props.d.jenis} description={this.props.d.ket}>
                <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button positive>Lihat Detail</Button>
                      <Button negative onClick={this.show}>Delete</Button>
                      <Confirm open={this.state.akanHapus} content='Apakah ingin menghapus resep ini?' onCancel={this.cancel} onConfirm={this.confirmed}/>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default App;
