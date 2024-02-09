
// const handleApiCall = () => {
//   const PAT = '2ca102d212a94b93b589e302dc00c670';
//   const USER_ID = 'craigdillenbeck';
//   const APP_ID = 'facial-recognition';
// }

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage
}

