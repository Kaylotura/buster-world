"""buster-world Models"""

from django.db import models


class PlayerStats(models.Model):
    """
    Value type that represents a player's name, score, and time played for any given session of the game.
    """
    name = models.TextField()
    score = models.TextField()
    time = models.TextField()

    def __str__(self):
        return self.name + ' ' + self.score

    def __repr__(self):
        return 'PlayerStats(name={!r}, score={!r}, time={!r})'.format(self.text, self.score, self.time)