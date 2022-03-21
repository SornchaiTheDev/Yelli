import EditorContext from './context';
import Content from './content';

function Editor(): JSX.Element {
  return (
    <EditorContext>
      <Content />
    </EditorContext>
  );
}

export default Editor;
