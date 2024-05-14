import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { presentPage } from './atoms';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
display: flex;
justify-content: center;
`
const Nav = styled.nav`
display: flex;
`;

const Button = styled.div`
padding: 0 10px;
cursor: pointer;
font-size: 20px;
margin: 0 5px 20px 5px;
&:hover {
    color: #F2884B;
}
`;

function Pagination(props) {
    const [page, setPage] = useRecoilState(presentPage); // 현재 페이지 수
    const currentSet = Math.ceil(page / props.btnRange); // 현재 버튼이 몇번째 세트인지 나타내는 수
    const startPage = (currentSet - 1) * props.btnRange + 1; // 현재 보여질 버튼의 첫번째 수
    const endPage = startPage + props.btnRange - 1; // 현재 보여질 끝 버튼의 수
    const totalSet = Math.ceil(Math.ceil(props.totalPost / props.pageRange) / props.btnRange); // 전체 버튼 세트 수
    return (
        < Container >
            <Nav>
                {currentSet > 1 && (
                    <Button onClick={() => setPage(startPage - 1)} $active={false}>
                        <IoIosArrowBack style={{ marginBottom: "4px" }} />
                    </Button>
                )}
                {Array(props.btnRange)
                    .fill(startPage)
                    .map((_, i) => {
                        return (
                            <Button
                                key={i}
                                onClick={() => setPage(startPage + i)}
                                $active={page === startPage + i}
                                style={{ display: startPage + i > props.totalPageNum ? "none" : null, color: startPage + i === page ? "#F2884B" : null }}
                            >
                                {startPage + i}
                            </Button>
                        );
                    })}
                {totalSet > currentSet && (
                    <Button onClick={() => setPage(endPage + 1)} $active={false}>
                        <IoIosArrowForward style={{ marginBottom: "4px" }} />
                    </Button>
                )}
            </Nav>
        </Container >
    )
}

export default Pagination;