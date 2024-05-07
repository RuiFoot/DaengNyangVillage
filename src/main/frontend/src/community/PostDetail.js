import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommunityNav from './communityNav';
import { free } from './FreeBoard';

// 전체 화면을 채우는 스타일
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 300vh; /* 최소 화면 높이를 화면의 100%로 설정 */
padding: 20px;
;`

// 포스트를 감싸는 스타일
const PostWrapper = styled.div`
width: 100%;
max-width: 800px; /* 포스트의 최대 너비를 설정 */
padding: 20px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
;
`

const PostTitle = styled.h2`
font-size: 24px;
margin-bottom: 10px;
;
`
const PostText = styled.p`
font-size: 16px;
line-height: 1.6;
;`

const PostMeta = styled.div`
margin-top: 20px;
font-size: 14px;
;`

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // API에서 데이터를 가져오는 대신 시간을 지연하여 가짜 데이터를 설정합니다.
        // 실제로 사용할 때는 axios.get을 사용하세요.
        setTimeout(() => {
            setPost(free[id]);
        }, 500);
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <CommunityNav />
            <PostWrapper>
                <PostTitle>{post.boardName}</PostTitle>
                <PostText>{post.text}</PostText>
                <PostMeta>
                    <p>작성자: {post.nickname}</p>
                    <p>작성일: {post.createDate}</p>
                    <p>리뷰 수: {post.reviewCnt}</p>
                </PostMeta>
            </PostWrapper>
        </Container>
    );
}

export default PostDetail;