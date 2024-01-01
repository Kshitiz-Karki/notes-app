import PropTypes from 'prop-types';

const Editor = ({ currentNote, updateNote }) => {

  return (
    <section className="pane editor">
      <textarea
        name='title'
        value={currentNote.title} 
        className='editor--title'
        onChange={e => updateNote(e)}
        readOnly={currentNote.title === 'Welcome !!' ? true : false}
        maxLength={35}
      />
      <textarea 
        name="body"
        value={currentNote.body}
        onChange={e => updateNote(e)}
        readOnly={currentNote.title === 'Welcome !!' ? true : false}
      />
    </section>
  )
}

Editor.propTypes = {
  currentNote: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string
  }),
  updateNote: PropTypes.func,
};

export default Editor