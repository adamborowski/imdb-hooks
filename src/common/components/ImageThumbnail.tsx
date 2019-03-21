import React, {FunctionComponent, HTMLProps, useState} from 'react';
import styled from 'styled-components';
import {Modal} from 'antd';

export interface ImageThumbnailProps extends HTMLProps<HTMLImageElement> {
  size?: number;
}
const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid #cccccc;
  transition: filter 150ms ease-out;
  cursor: pointer;
  background: #cccccc;
  &:hover {
    filter: brightness(1.09);
  }
`;

export const ImageThumbnail: FunctionComponent<ImageThumbnailProps> = ({ src, size, style, ...rest }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  return (
    <>
      <StyledImage
        src={src}
        style={{ ...style, height: size, width: size }}
        onClick={src ? () => setOpen(true) : undefined}
      />
      <Modal
        width="calc(100vw - 250px)"
        visible={open}
        onCancel={close}
        onOk={close}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText="Close"
      >
        <img src={src} style={{ height: 'calc(100vh - 250px)', width: '100%', objectFit: 'scale-down' }} />
      </Modal>
    </>
  );
};

ImageThumbnail.defaultProps = {
  size: 100
};
