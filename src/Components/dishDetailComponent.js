import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderComments(comments) {
        if (comments == null) {return(<div></div>);}
        const cmnts = comments.map(dishComment => {
            return (
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
            );
        });
        return (
            <div className='col-12 col-md-5 m-1'>
                <h1> Comments </h1>
                <ul className = "list-unstyled">{cmnts}</ul>
            </div>
        );
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
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

    render() {
        const dish = this.props.dish
        if (dish == null){return(<div></div>);} 
        const dishItem = this.renderDish(dish)
        const commentItem = this.renderComments(dish.comments)
        return (
            <div className = "container">
            <div className="row">
                {dishItem}
                {commentItem}
            </div>
            </div>
        );
    }

}

export default DishDetail