import { OneUserInList } from './OneUserInList';

const LikeList = ({ likes }) => {
    return (
        <>
            <div>
                {likes &&
                    likes?.map(({ owner }) => (
                        <OneUserInList
                            key={owner._id}
                            user={owner}
                        />
                    ))}
            </div>
        </>
    )
}

export default LikeList