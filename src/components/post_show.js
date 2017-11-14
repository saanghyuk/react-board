import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

import {fetchPost, deletePost} from '../actions/index'


class PostsShow extends Component{
    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }


    static contextTypes={
        router : PropTypes.object
    };

    onDeleteClick(){
        this.props.deletePost(this.props.params.id)
            .then(()=>{
            this.context.router.push('/')
            })
    }

    render(){
        const {post}=this.props;
        if(!this.props.post){
            return <div>Loading</div>
        }
        return(
            <div>
            <Link to="/">Back to index</Link>
            <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger pull-xs-right">
                Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>
                Categories: {post.categories}
            </h6>
            <p>{post.content}</p>
            </div>
        )
    }
}




function mapStateToProps(state){
    return {post: state.posts.post}
}
export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)