import React from 'react';
import { connect } from "react-redux";
import Card from "@mui/material/Card"
import { CardContent, Typography } from "@mui/material";
import { backendUrl } from "../../gql/backendUrl";
import Avatar from "../../components/Avatar/Avatar";
import DefaultAvatar from "../../components/Avatar/DefaultAvatar";
import { Link } from "react-router-dom";
import { ImagesSlider } from "../Slider/Slider";
import { CLike } from "..//Like/Like";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModalBox from "../Like/ModalBox";
import { getDate } from "../DateFormating";
import { CNewComment } from "../Comments/NewComment";

const FeedPost = ({ post = [] }) => {

    return (
        <>
            {post?.images?.[0]?.url ?
                (
                    <Card sx={{ maxWidth: 345 }}
                        style={{ boxShadow: '1px 2px 4px #0000008c', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}
                    >
                        <header className='card-header' style={{padding: '20px', paddingBottom: '0' }}>
                            <div className='card-author-box'>
                                <Link to={`/profile/${post?.owner?._id}`}>
                                    {post?.owner?.avatar === null ? (
                                        <DefaultAvatar className='small-ava avatarPic' />
                                    ) : (
                                        <Avatar url={post?.owner?.avatar?.url} className='small-ava avatarPic' />
                                    )}
                                    <h4>{'@' + post?.owner.login}</h4>
                                </Link>

                            </div>
                            <div style={{ color: '#959292' }}>{getDate(post?.createdAt)}</div>
                        </header>

                        <CardContent>
                            <div className='card-cont'>
                                {post?.images.length === 1 ? (
                                    <img
                                        height="580"
                                        src={`${backendUrl + post?.images[0]?.url}`}
                                        alt="post-picture"
                                        className='feed-post-img'
                                    />) : (
                                    <ImagesSlider images={post?.images} key={Math.random() * 1000} className='feed-post-img' />
                                )
                                }

                                <CLike post={post} postId={post?._id} likeClass='feed-post-like-box' likeInfoClass='feed-post-like-info' />
                            </div>
                            {post?.comments ?
                                <ModalBox comments={post?.comments} postId={post?._id}>
                                    <ChatBubbleOutlineOutlinedIcon style={{ position: 'relative', top: '5px' }} />
                                    <span className='ordinaryBtn'>
                                        {post?.comments.length > 1 ? `SHOW ALL ${post?.comments.length} COMMENTS` : 'SHOW A COMMENT'}
                                    </span>
                                </ModalBox>
                                : <CNewComment postId={post?._id} />
                            }
                        </CardContent>
                    </Card>) : null
            }
        </>
    );
}

export const CFeedPost = connect((state) => ({
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed
}), null
)(FeedPost);