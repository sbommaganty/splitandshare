import Avatar from '@mui/material/Avatar';

const ProgressCircle = ({ r, cx, cy, strokeWidth, progress, letter }) => {
  const circumference = 2 * 3.14 * r;
  const offset = circumference * ((100 - progress) / 100);

  const styles = {
    segmentedProgressCircle: {
      position: 'relative',
      display: 'inline-block',
     
     },
    circles: {
      transform: 'rotate(-90deg)',
    },

    icon:{
      height: '3cm',
      width: '3cm',
      fontSize: '80px',
      color: 'white'
      
   },

    svg: {
      width: '160px',
      height: '160px',
    },
    backgroundDashes: {
      fill: 'transparent',
      strokeLinecap: 'round',
      stroke: 'white',
    },

    avatarContainer: {
      position: 'absolute',
      top: '50%',
      left: '9ch',
      width: '110px',  // Slightly smaller than the circle's diameter to fit inside
      height: '110px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    progressDashes: {
      fill: 'transparent',
      strokeLinecap: 'round',
      stroke: 'red',
      strokeDasharray: `${circumference}px`,
      strokeDashoffset: `${offset}px`,
    },
  };

  // return (
  //   <div style={styles.segmentedProgressCircle}>
  //     <div style={styles.circles}>
  //       <svg style={styles.svg}>
  //         <circle
  //           r={r}
  //           cy={cy}
  //           cx={cx}
  //           strokeWidth={strokeWidth}
  //           style={styles.backgroundDashes}
  //         ></circle>
  //         <circle
  //           r={r}
  //           cy={cy}
  //           cx={cx}
  //           strokeWidth={strokeWidth}
  //           style={styles.progressDashes}
  //         ></circle>
  //       </svg>
  //     </div>
  //   </div>
  // );

  return (
<div style={styles.segmentedProgressCircle}   

>
      <div style={styles.circles} 
      
      >
        <svg style={styles.svg} 
        
        >
          <circle
            r={r}
            cy={cy}
            cx={cx}
            // className='bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'
            strokeWidth={strokeWidth}
            style={styles.backgroundDashes}
          ></circle>
          <circle
            r={r}
            cy={cy}
            cx={cx}
            // className='bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'
            strokeWidth={strokeWidth}
            style={styles.progressDashes}
          ></circle>
        </svg>
      </div>
      <div style={styles.avatarContainer}>
      <Avatar sx={styles.icon}
      // className='bg-gradient-to-br from-green-400 to-blue-600 '

      >{letter}</Avatar>
       </div>
    </div>
  );
};

export default ProgressCircle;