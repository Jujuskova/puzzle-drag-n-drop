import React, { useState } from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import Gif from './Gif'

const SortableGifsContainer = sortableContainer(({ children }) => (
  <div className="gif-container">{children}</div>
))

const SortableGif = sortableElement(({ gif }) => <Gif key={gif} gif={gif} />)

const GifTest = () => {
  const [gifs, setGifs] = useState([
    'https://media.giphy.com/media/3ohhwoWSCtJzznXbuo/giphy.gif',
    'https://media.giphy.com/media/l46CbZ7KWEhN1oci4/giphy.gif',
    'https://media.giphy.com/media/3ohzgD1wRxpvpkDCSI/giphy.gif',
    'https://media.giphy.com/media/xT1XGYy9NPhWRPp4pq/giphy.gif',
    'https://media.giphy.com/media/xiOgHgY2ceKhm46cAj/giphy.gif',
    'https://media.giphy.com/media/3oKIPuMqYfRsyJTWfu/giphy.gif',
    'https://media.giphy.com/media/4ZgLPakqTajjVFOVqw/giphy.gif',
    'https://media.giphy.com/media/3o7btXIelzs8nBnznG/giphy.gif',
  ])
  const [newGifs, setNewGifs] = useState([
    'https://media.giphy.com/media/NKEt9elQ5cR68/giphy.gif',
    'https://media.giphy.com/media/xTiTngr9yuzdAIrQkM/giphy.gif',
    'https://media.giphy.com/media/3ohhwxTQp8aF5W6hQk/giphy.gif',
    'https://media.giphy.com/media/eB650YQLJPyO4/giphy.gif',
  ])

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    if (collection === 'oldGifs') {
      setGifs(arrayMove(gifs, oldIndex, newIndex))
      return
    }
    setNewGifs(arrayMove(newGifs, oldIndex, newIndex))
  }

  return (
    <>
      <SortableGifsContainer axis="xy" onSortEnd={onSortEnd}>
        {gifs.map((gif, i) => (
          <SortableGif index={i} key={gif} gif={gif} collection="oldGifs" />
        ))}
      </SortableGifsContainer>

      <SortableGifsContainer axis="x" onSortEnd={onSortEnd}>
        {newGifs.map((gif, i) => (
          <SortableGif index={i} key={gif} gif={gif} collection="newGifs" />
        ))}
      </SortableGifsContainer>
    </>
  )
}

export default GifTest
