import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BsCamera, BsPerson } from 'react-icons/bs';
import postPhotoApi from '../../api/postPhotoApi';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionProfile = styled.div`
  position: relative;
  text-align: center;
  margin: 0 6rem;
  margin-bottom: 9rem;
  @media screen and (max-width: 549px) {
    margin-bottom: 5rem;
  }
`;

const ProfileStyle = css`
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid var(--holder-base-color);
  border-radius: 50%;
`;

const ProfileDefault = styled.div`
  ${ProfileStyle}
`;

const ProfilePreview = styled.img`
  ${ProfileStyle}
  border:0.5px solid var(--holder-base-color);
  object-fit: cover;
`;

const ProfileEdit = styled.label`
  ${ProfileStyle}
  position:absolute;
  bottom: 0;
  right: 0;
  width: 4.5rem;
  height: 4.5rem;
  background-color: var(--base-white-color);
  &:hover {
    background-color: var(--font-base-grey);
    transition: 0.2s all ease-in-out;
  }
  &:active {
    scale: calc(0.9);
  }
`;

const CameraIcon = styled(BsCamera)`
  font-size: 2.5rem;
  color: var(--holder-base-color);
`;

const AvatarIcon = styled(BsPerson)`
  width: 5rem;
  height: 5rem;
  color: var(--holder-base-color);
`;

const ProfileHidden = styled.input`
  display: none;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 5px;
`;

function MyInfoEditProfile({ formData, setFormData }) {
  const [blob, setBlob] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [resURL, setResURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const uploadImage = async event => {
    setBlob(...event.target.files);
  };

  const validatePhotos = event => {
    const targetFileSize = event.target.files[0].size;
    const targetFileSizeToMb = targetFileSize / (1024 * 1024);
    const targetFileSizeToKb = targetFileSize / 1024;
    const MAX_SIZE_MB = 3;
    const MIN_SIZE_KB = 0;

    if (targetFileSizeToMb > MAX_SIZE_MB) {
      setErrorMessage(`${MAX_SIZE_MB}MB 미만의 사진을 업로드하세요.`);
    } else if (targetFileSizeToKb < MIN_SIZE_KB) {
      setErrorMessage(`최소 업로드 크기는 ${MIN_SIZE_KB}KB 입니다.`);
    } else {
      setErrorMessage('');
      uploadImage(event);
    }
  };

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

  useEffect(() => {
    const reader = new FileReader();
    if (blob) {
      reader.readAsDataURL(blob);
      reader.onload = event => {
        setPreviewUrl(event.target.result);
      };
    }
  }, [blob]);

  useEffect(() => {
    const blobFormData = new FormData();
    if (blob) {
      blobFormData.append('images', blob);
    }
    try {
      if (blob) {
        postPhotoApi(blobFormData).then(res => {
          setResURL(...res.data.imagePaths);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [blob]);

  /* eslint-disable */
  const handleClick = event => {
    event.target.value = '';
  };

  useEffect(() => {
    setFormData({ ...formData, profile: resURL });
  }, [resURL]);

  return (
    <Wrapper>
      {!errorMessage.length ? null : <ErrorMsg>{errorMessage}</ErrorMsg>}
      <SectionProfile>
        <ProfileHidden
          type="file"
          id="profile"
          name="profile"
          onChange={typeCheck}
          onClick={handleClick}
          accept="image/png, image/jpg, image/jpeg"
        />
        {previewUrl ? (
          <ProfilePreview src={previewUrl} alt="preview" />
        ) : (
          <ProfileDefault>
            <AvatarIcon />
          </ProfileDefault>
        )}
        <ProfileEdit htmlFor="profile">
          <CameraIcon />
        </ProfileEdit>
      </SectionProfile>
    </Wrapper>
  );
}

export default MyInfoEditProfile;
