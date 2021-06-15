/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const fadeInVariation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const FormModel = ({
  isVisible,
  children,
  containerAnimationType = 'fadeIn',
  contentAnimationType = 'fadeIn',
}) => {
  let containerAnimation = null;
  let contentAnimation = null;
  switch (containerAnimationType) {
    case 'fadeIn': {
      containerAnimation = fadeInVariation;
      break;
    }
  }

  switch (contentAnimationType) {
    case 'fadeIn': {
      contentAnimation = fadeInVariation;
      break;
    }
  }
  const modelRender = () => {
    return isVisible ? (
      <React.Fragment>
        <motion.div
          className='form-model'
          variants={containerAnimation}
          initial='hidden'
          animate='visible'
        >
          <motion.div className='form-model__card' variants={contentAnimation}>
            {children}
          </motion.div>
        </motion.div>
      </React.Fragment>
    ) : null;
  };
  return ReactDOM.createPortal(
    modelRender(),

    document.getElementById('form-model')
  );
};

export default FormModel;
