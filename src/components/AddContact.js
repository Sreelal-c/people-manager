import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Col, Button, Container, Card} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {db} from '../config/firebase';

class AddContact extends Component{
    state = {
        name: '',
        nickname: '',
        phone: '',
        altphone:'',
        email:'',
        address: '',
        facebook: '',
        job: '',
        notes: '',
        success:false,
    };
    
    handleFormSubmit = evt => {
        const { history } = this.props;
        evt.preventDefault();
        
        db.collection("contacts").add({
            name: this.state.name,
            nickname: this.state.nickname,
            phone: this.state.phone,
            altphone:this.state.altphone,
            email:this.state.email,
            address: this.state.address,
            facebook: this.state.facebook,
            job: this.state.job,
            notes: this.state.notes,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            NotificationManager.success('Contact is saved successfully', 'Success!');
            setTimeout(() => {history.push('/details/'+docRef.id)}, 2000);
        })
        .catch(function(error) {
            NotificationManager.Error('Failed to save contact', 'Error!');
            console.error("Error adding document: ", error);
        });
        
    }

    handleInputChange = evt => {
       
        this.setState({
            [evt.target.name] : evt.target.value
        });
    };

    render(){
        const {name,nickname,phone,altphone,email,address,facebook,job,notes} = this.state;
    return(
        <Container>
            <NotificationContainer/>
            <Card>
                <Card.Header>
                    Add New Contact
                    <LinkContainer variant="outline-danger" to="/">
                        <Button className="float-right" size="sm" variant="outline-danger">Cancel</Button>
                    </LinkContainer>
                </Card.Header>
                <Card.Body>
                    {this.state.success?<p>Contact Added</p>:null}
                <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={name} onChange={this.handleInputChange} type="text" placeholder="Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="nickname">
                            <Form.Label>Nick Name</Form.Label>
                            <Form.Control name="nickname" value={nickname} onChange={this.handleInputChange}  type="text" placeholder="Nick Name" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phone" value={phone} onChange={this.handleInputChange} type="text" placeholder="Phone" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="phone2">
                            <Form.Label>Alt Number</Form.Label>
                            <Form.Control name="altphone" value={altphone} onChange={this.handleInputChange}  type="text" placeholder="Alt. Number" />
                            </Form.Group>
                        </Form.Row>
            
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={email} onChange={this.handleInputChange} type="email" placeholder="Email" />
                        </Form.Group>
                        
                        <Form.Group controlId="facebook">
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control name="facebook" value={facebook} onChange={this.handleInputChange} type="text" placeholder="facebook" />
                        </Form.Group> 

                        <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="address" value={address} onChange={this.handleInputChange} placeholder="Address" />
                        </Form.Group>

                        <Form.Group controlId="job">
                            <Form.Label>Job</Form.Label>
                            <Form.Control name="job" value={job} type="text" onChange={this.handleInputChange} placeholder="Job/ Designation" />
                        </Form.Group>

                        <Form.Group controlId="notes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control name="notes" value={notes} onChange={this.handleInputChange} type="text" placeholder="Notes" />
                        </Form.Group>  
                </Form>
                </Card.Body>
                <Card.Footer>
                    <span>&nbsp;</span>
                    <Button  variant="success" onClick={this.handleFormSubmit} type="submit">Add Contact</Button></Card.Footer>         
            </Card>
        </Container>
        
    )
    }
}

export default withRouter(AddContact);