import React, { Fragment, Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Col, Row, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

   function RenderComments({comments,addComment,dishId}) {
        if (comments == null) {return(<div></div>);}
        const cmnts = comments.map(dishComment => {
            return (
              <div>
                  <li key={dishComment.id}>
                    <p>{dishComment.comment}</p>
                    <p>-- {dishComment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(dishComment.date))}
                    </p>
                </li>
              </div> 
            );
        });
        return (
            <div className='col-12 m-1'>
                <h1> Comments </h1>
                <ul className = "list-unstyled">{cmnts}</ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }

   function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else{return(<div></div>);}
    }

    const DishDetail = (props) => {
        if (props.dish != null){
            return (
                <>
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                              <RenderComments comments={props.comments}
                                      addComment={props.addComment}
                                       dishId={props.dish.id} />
                    </div>
                </div>
                </div>
                </>
            );
        } 
        else{return(<div></div>);} 
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleComments=this.toggleComments.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleComments(){
       this.setState({
           isModalOpen: !this.state.isModalOpen
       });
    }

    handleSubmit(values){
        this.toggleComments();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

   render(){
       return(
       <div>
           <Button outline light onClick={this.toggleComments} className="ml-4"><span className="fa fa-pencil"></span> Submit Comment</Button>
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleComments}>
           <ModalHeader toggle={this.toggleComments}>Submit Comment</ModalHeader>
           <ModalBody>
             <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                 <Row> 
                     <Label htmlFor="rating" md={12}>Rating</Label>
                     <Col md={12}>
                         <Control.select model=".rating" id="rating" name="rating" className="form-control">
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                             <option>4</option>
                             <option>5</option>
                         </Control.select>
                     </Col>
                 </Row>
                 <Row>
                 <Label htmlFor="author" md={12}>Your Name</Label>
                     <Col md={12}>
                         <Control.text model=".author" id="author" name="author" className="form-control"
                        validators={{
                            required,minLength:minLength(3),maxLength:maxLength(15)
                        }}
                         />
                         <Errors
                         className="text-danger"
                         model=".author"
                         messages={{
                             required:'required ',
                             minLength:'Must be greater than 2 characters',
                             maxLength:'must be 15 characters or less'
                         }
                         }
                         />
                     </Col>  
                 </Row>
                 <Row>
                 <Label htmlFor="comment" md={12}>Comment</Label>
                     <Col md={12}>
                         <Control.textarea
                         model=".comment" id="comment" name="comment" className="form-control" rows={6}/>
                     </Col>
                 </Row>
                 <Button type="submit" color="primary" className="mt-3">Submit</Button>
             </LocalForm>
           </ModalBody>
       </Modal>
       </div>
       );
   }
}

export default DishDetail;