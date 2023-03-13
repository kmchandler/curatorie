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
import { BsPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import { CiPizza } from 'react-icons/ci';
import { HiHeart } from 'react-icons/hi';

export default function IconRender({ iconName }) {
  if (iconName === 'autumn') {
    return <GiPumpkin className="iconSize" />;
  } if (iconName === 'barbell') {
    return <TbBarbell className="iconSize" />;
  } if (iconName === 'bear') {
    return <RiBearSmileFill className="iconSize" />;
  } if (iconName === 'bike') {
    return <GrBike className="iconSize" />;
  } if (iconName === 'books') {
    return <TbBooks className="iconSize" />;
  } if (iconName === 'cat') {
    return <GiCat className="iconSize" />;
  } if (iconName === 'checklist') {
    return <GoChecklist className="iconSize" />;
  } if (iconName === 'dog') {
    return <FaDog className="iconSize" />;
  } if (iconName === 'flowers') {
    return <GiFlowerPot className="iconSize" />;
  } if (iconName === 'heart') {
    return <HiHeart className="iconSize" />;
  } if (iconName === 'house') {
    return <GiHouse className="iconSize" />;
  } if (iconName === 'makeup') {
    return <GiLipstick className="iconSize" />;
  } if (iconName === 'pacifier') {
    return <FaBabyCarriage className="iconSize" />;
  } if (iconName === 'people') {
    return <BsPeopleFill className="iconSize" />;
  } if (iconName === 'person') {
    return <BsFillPersonFill className="iconSize" />;
  } if (iconName === 'pizza') {
    return <CiPizza className="iconSize" />;
  } if (iconName === 'present') {
    return <TbBarbell className="iconSize" />;
  } if (iconName === 'snowflake') {
    return <TbSnowflake className="iconSize" />;
  } if (iconName === 'sun') {
    return <RiSunFoggyLine className="iconSize" />;
  } if (iconName === 'tree') {
    return <TbChristmasTree className="iconSize" />;
  }
  return null;
}

IconRender.propTypes = {
  iconName: PropTypes.string.isRequired,
};
