import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { containerVariants, itemVariants } from './variants';

const Dashboard = ({ customer }) => {
  useEffect(() => {
    document.title = 'אתר דוגמה - Dashboard';
  }, []);

  return (
    <div className='dashboard'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        div
        className='dashboard__cards'
      >
        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-primary'>דוח 1</div>
          דוח 1
        </motion.div>

        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>דוח 2</div>
          דוח 2
        </motion.div>

        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-green'>דוח 3</div>
          דוח 3
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-blue'>דוח 4</div>
          דוח 4
        </motion.div>
      </motion.div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
    user: state.userReducer,
  };
};
export default connect(mapStateToProps)(Dashboard);
