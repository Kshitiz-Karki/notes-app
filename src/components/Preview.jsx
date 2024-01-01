import Markdown from 'react-markdown'
import PropTypes from 'prop-types';

const Preview = ({ currentNote }) => {

  return (
    <section className="pane preview">
      <Markdown>
        {currentNote.body}
      </Markdown>
    </section>
  )
}

Preview.propTypes = {
  currentNote: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string
  }),
};

export default Preview