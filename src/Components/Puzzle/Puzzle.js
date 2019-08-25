import React from 'react'
import PropTypes from 'prop-types'

const Puzzle = ({ item }) => <img src={item.img} alt={item.id} />

Puzzle.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
}

export default Puzzle
