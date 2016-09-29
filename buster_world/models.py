"""buster_world Models
This module contains the PlayerStats Class Object, which is a Django model for storing a player's name, score, and time.
"""

from django.db import models


class PlayerStats(models.Model):
    """Value type that represents a player's name, score, and time for any given session of the game."""
    name = models.TextField()
    score = models.IntegerField()
    time = models.FloatField()

    def __str__(self):
        """Defines the simple string representation that any given PlayerStats model will use.

         >>> butterfly = models.PlayerStats(name='Samurai', score=3, time=4)
         >>> butterfly.__str__()
         'Samurai 3'
        """
        return self.name + ' ' + str(self.score)

    def __repr__(self):
        """Defines the complete representation that any given PlayerStats model will use.

         >>> drink_alone = models.PlayerStats(name='George', score=15, time=37)
         >>> drink_alone.__repr__()
         'PlayerStats(name=George, score=15, time=37)'
        """
        return 'PlayerStats(name={!r}, score={!r}, time={!r})'.format(self.text, self.score, self.time)
