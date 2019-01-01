import meetupsDb from '../data/meetups';

class MeetupController {
  static allMeetup(req, res) {
    return (meetupsDb.length > 0) ? res.status(200).json({
      status: 200,
      data: meetupsDb,
    }) : res.status(404).json({
      status: 404,
      message: 'No Meetup',
    });
  }
}

export default MeetupController;
