import PropTypes from 'prop-types';
import {
  GiPumpkin, GiCat, GiFlowerPot, GiHouse, GiLipstick,
} from 'react-icons/gi';
import {
  TbBarbell, TbBooks, TbSnowflake, TbChristmasTree,
} from 'react-icons/tb';
import { RiBearSmileFill, RiSunFoggyLine } from 'react-icons/ri';
import { GrBike } from 'react-icons/gr';
import { GoChecklist } from 'react-icons/go';
import { FaDog, FaBabyCarriage } from 'react-icons/fa';
import { BsFillSuitHeartFill, BsPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import { CiPizza } from 'react-icons/ci';

export default function IconRender({ iconName }) {
  if (iconName === 'autumn') {
    return <GiPumpkin />;
  } if (iconName === 'barbell') {
    return <TbBarbell />;
  } if (iconName === 'bear') {
    return <RiBearSmileFill />;
  } if (iconName === 'bike') {
    return <GrBike />;
  } if (iconName === 'books') {
    return <TbBooks />;
  } if (iconName === 'cat') {
    return <GiCat />;
  } if (iconName === 'checklist') {
    return <GoChecklist />;
  } if (iconName === 'dog') {
    return <FaDog />;
  } if (iconName === 'flowers') {
    return <GiFlowerPot />;
  } if (iconName === 'heart') {
    return <BsFillSuitHeartFill />;
  } if (iconName === 'house') {
    return <GiHouse />;
  } if (iconName === 'makeup') {
    return <GiLipstick />;
  } if (iconName === 'pacifier') {
    return <FaBabyCarriage />;
  } if (iconName === 'people') {
    return <BsPeopleFill />;
  } if (iconName === 'person') {
    return <BsFillPersonFill />;
  } if (iconName === 'pizza') {
    return <CiPizza />;
  } if (iconName === 'present') {
    return <TbBarbell />;
  } if (iconName === 'snowflake') {
    return <TbSnowflake />;
  } if (iconName === 'sun') {
    return <RiSunFoggyLine />;
  } if (iconName === 'tree') {
    return <TbChristmasTree />;
  }
  return null;
}

IconRender.propTypes = {
  iconName: PropTypes.string.isRequired,
};
