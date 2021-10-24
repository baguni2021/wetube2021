import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

videoSchema.pre('save', async function () {
  console.log('We are about save', this);
});

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags.split(',').map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const Video = mongoose.model('Video', videoSchema);
// 아래는 터미널 명령어
// show dbs
// use wetube
// show collections
// db.videos.find()
// db.videos.remove({})

export default Video;
