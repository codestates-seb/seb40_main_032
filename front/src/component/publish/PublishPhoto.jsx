import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { BsCamera } from 'react-icons/bs';
import { MdRemoveCircleOutline } from 'react-icons/md';
import postPhotoApi from '../../api/postPhotoApi';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  .message__error {
    color: red;
  }
  @media screen and (max-width: 549px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UploaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  > div {
    display: flex;
  }
`;

const PreviewContainer = styled.div`
  flex-wrap: wrap;
  position: relative;
  &:nth-child(1) {
    #thumbnail {
      position: absolute;
      display: block;
      left: 0;
    }
    border-radius: 1rem;
  }
  .remove__button {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: var(--font-semi-bold);
  }
`;

const Preview = styled.img`
  background-size: cover;
  width: 10rem;
  height: 10rem;
  border-radius: var(--radius-10);
  object-fit: cover;
`;

const Thumbnail = styled.div`
  display: none;
  width: 3.5rem;
  padding: 3px;
  text-align: center;
  background-color: #40bf77;
  color: white;
  border-radius: 1rem 0 1rem 0;
`;

const RemoveIcon = styled(MdRemoveCircleOutline)`
  font-size: 1.5rem;
  color: var(--base-white-color);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-10);
  cursor: pointer;
  &:hover {
    color: #f33f3f;
  }
`;

const UploaderWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  border: 2px dashed var(--holder-base-color);
  display: flex;
  justify-content: center;
  align-items: center;
  #uploader__button {
    display: none;
    width: 10rem;
    height: 10rem;
    border: 2px dashed var(--holder-base-color);
    border-radius: 10px;
  }
  > div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const CameraIcon = styled(BsCamera)`
  color: var(--holder-base-color);
  font-size: 3.5rem;
  cursor: pointer;
  opacity: 0.8;
  @keyframes scaler {
    25% {
      font-size: 3.25rem;
    }
    50% {
      font-size: 3rem;
    }
    75% {
      font-size: 3.25rem;
    }
  }
  &:hover {
    animation: scaler 1s linear infinite;
    opacity: 1;
  }
`;

const PublishPhoto = forwardRef(({ setPhotoUrl, deleteImages }, ref) => {
  const [photos, setPhotos] = useState([]);
  const [blobPhotos, setBlobPhotos] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // 미리보기 사진 띄우는 함수
  const uploadPhotos = async event => {
    const uploaded = [...photos];
    setBlobPhotos(...event.target.files);
    const targetFiles = [...event.target.files];

    // Blob 객체를 임시 URL로 바꾸어 img src로 mapping
    targetFiles.map(obj => {
      return uploaded.push(URL.createObjectURL(obj));
    });

    setPhotos(uploaded);
  };

  // 업로드사진 용량확인 함수
  const validatePhotos = event => {
    const targetFileSize = event.target.files[0].size;
    const targetFileSizeToMb = targetFileSize / (1024 * 1024);
    const targetFileSizeToKb = targetFileSize / 1024;

    const MAX_SIZE_MB = 10;
    const MIN_SIZE_KB = 0;

    if (targetFileSizeToMb > MAX_SIZE_MB) {
      setErrorMessage(`사진 1장당 최대 ${MAX_SIZE_MB}MB까지 등록 가능합니다.`);
    } else if (targetFileSizeToKb < MIN_SIZE_KB) {
      setErrorMessage(`최소 업로드 크기는 ${MIN_SIZE_KB}KB 입니다.`);
    } else {
      setErrorMessage('');
      uploadPhotos(event);
    }
  };

  // 업로드사진 타입확인 함수
  const typeCheck = event => {
    const targetFileType = event.target.files[0].type;

    const targetFileTypeShort = targetFileType.slice(
      targetFileType.indexOf('/') + 1,
      targetFileType.length,
    );

    const onlyAccept = ['image/jpeg', 'image/png', 'image/jpg'];

    if (onlyAccept.indexOf(targetFileType) === -1) {
      setErrorMessage(`${targetFileTypeShort} 형식은 업로드할 수 없습니다.`);
    } else validatePhotos(event);
  };

  // 수정페이지 진입시 미리보기 불러오는 함수
  const preview = data => {
    return data.map(el => photos.push(el));
  };
  useImperativeHandle(ref, () => ({ preview }));

  // 사진 개별 삭제하는 함수
  const removePhotos = indexRemove => {
    // 미리보기에서 삭제
    URL.revokeObjectURL(photos[indexRemove]);
    setPhotos([...photos.filter((_, index) => index !== indexRemove)]);
    // Formdata에서 삭제
    deleteImages(indexRemove);
    setErrorMessage('');
  };

  // 동일한 사진을 여러번 올릴수 있게 해주는 함수
  /* eslint-disable */
  const handleClick = event => {
    event.target.value = '';
  };

  // blob에 사진 추가 시 사진 post 요청
  useEffect(() => {
    const formData = new FormData();
    if (blobPhotos) {
      formData.append(`images`, blobPhotos, `${blobPhotos.name}`);
    }
    try {
      if (blobPhotos) {
        postPhotoApi(formData).then(res => setPhotoUrl(...res.data.imagePaths));
      }
    } catch (err) {
      console.log(err);
    }
  }, [blobPhotos]);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      // 생성된 URL 메모리에서 삭제하는 메서드
      return URL.revokeObjectURL(photos);
    };
  }, []);

  return (
    <Container>
      <UploaderContainer>
        {photos.length === 0 ? null : (
          <>
            {photos.map((url, index) => (
              <PreviewContainer key={url.slice(-10).replace('.', '')}>
                <Preview src={url} alt="photos" />
                <Thumbnail id="thumbnail">대표</Thumbnail>
                <RemoveIcon
                  className="remove__button"
                  onClick={() => removePhotos(index)}
                />
              </PreviewContainer>
            ))}
          </>
        )}
        <UploaderWrapper
          style={{ display: photos.length === 5 ? 'none' : 'block' }}
        >
          <div>
            <label htmlFor="uploader__button">
              <CameraIcon />
            </label>
            <input
              id="uploader__button"
              type="file"
              onChange={typeCheck}
              onClick={handleClick}
              accept="image/jpg, image/png, image/jpeg"
            />
          </div>
        </UploaderWrapper>
      </UploaderContainer>
      <div>
        {!errorMessage.length ? null : (
          <div className="message__error">{errorMessage}</div>
        )}
      </div>
      <div className="message">
        <span>
          사진은 최대 5개까지 등록할 수 있으며, 지원하는 파일 형식은 jpg, jpeg,
          png입니다.
        </span>
      </div>
    </Container>
  );
});

export default PublishPhoto;
