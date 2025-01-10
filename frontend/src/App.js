
function App() {

  return (
    <div className="App">

      <form action="http://localhost:3000/add" method="post" enctype="multipart/form-data">
      <input type="file" name="image" id="image" />
      <input type="text" name="caption" id="caption" />
      <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
