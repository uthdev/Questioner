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

  static getAMeetup(req, res) {
    const meetup = meetupsDb.find(meet => meet.id === parseInt(req.params.id));
    if(!meetup) return res.status(404).json({
      status: 404,
      error: "The meetup with given ID was not found"
    })
    res.status(200).json({
      status: 200,
      data: [meetup]
  });
  }
}

export default MeetupController;
