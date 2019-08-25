import React, { useState, useEffect } from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { sortBy, isEqual } from 'lodash'
import Puzzle from './Puzzle'
import { puzzleImages } from './puzzleImages'
import shuffle from '../../helpers/shuffle'

const SortablePuzzleContainer = sortableContainer(({ children }) => (
  <div className="puzzle-container">{children}</div>
))

const SortablePuzzlePart = sortableElement(({ item }) => (
  <Puzzle item={item} key={item.id} />
))

const PuzzleContainer = () => {
  const [puzzleItems, setPuzzleItems] = useState(puzzleImages)
  const [isFinished, setIsFinished] = useState(false)
  const [instructions] = useState('Remember what the image looks like...')

  useEffect(() => {
    setTimeout(() => {
      setPuzzleItems(prevState => {
        const puzzle = [...prevState]
        return shuffle(puzzle)
      })
    }, 3000)
  }, [])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    // setPuzzleItems(arrayMove(puzzleItems, oldIndex, newIndex));
    setPuzzleItems(prevState => {
      const data = [...prevState]

      const temp = data[oldIndex]
      data[oldIndex] = data[newIndex]
      data[newIndex] = temp

      if (isEqual(data, sortBy(puzzleImages, ['id']))) {
        setIsFinished(true)
      }

      return data
    })
  }

  const handleReset = () => {
    setPuzzleItems(shuffle(puzzleItems))
    setIsFinished(false)
  }

  return (
    <div className="puzzle-page">
      <h2>Puzzle</h2>

      {isFinished && (
        <button type="button" onClick={handleReset}>
          Try Again
        </button>
      )}
      <SortablePuzzleContainer
        axis="xy"
        onSortEnd={onSortEnd}
        transitionDuration={0}
      >
        {puzzleItems.map((item, i) => (
          <SortablePuzzlePart item={item} key={item.id} index={i} />
        ))}
      </SortablePuzzleContainer>
      {!isFinished && isEqual(puzzleItems, sortBy(puzzleImages, ['id'])) && (
        <p>{instructions}</p>
      )}
      {isFinished && <div className="success-message">Well done !</div>}
    </div>
  )
}

export default PuzzleContainer
