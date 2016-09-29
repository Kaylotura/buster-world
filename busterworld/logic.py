"""Buster World  Logic
This module runs two major logical functions for the buster world  Database, one which creates and saves a new Player
Stats Class Object, and another that lists them by high score.
"""

from . import models

PLAYER_SCORES = models.PlayerStats.objects


def create_and_save_new_player_stat(name, score, time):
    """Takes in a player's name, their score, and the time they played and creates and saves a new PlayerStats django
    class object.

    >>> dropkick = create_and_save_new_player_stat('Rose Tattoo', 3, 5)
    >>> dropkick
    'PlayerStats(text=Rose Tattoo, score=3, time=5)'
    """
    new_player_stats = models.PlayerStats(name=name, score=score, time=time)
    new_player_stats.save()
    return new_player_stats


def get_player_stats_by_score(player_stats=PLAYER_SCORES):
    """ Returns all the player_stats ordered by score, beginning with the highest and descending from there.

    Usually this function will not require an argument, however one has been supplied for testing purposes, it will
    default to all PlayerStats objects.

    >>> mario = models.PlayerStats(name='mario', score=3, time=1)
    >>> kirby = models.PlayerStats(name='kirby', score=5, time=1)
    >>> link = models.PlayerStats(name='link', score=28, time=1)
    >>> test_group = [mario, kirby, link]
    >>> group_by_score = get_player_stats_by_score(test_group)
    >>> [member.name for member in group_by_score]
    ['link', 'kirby', 'mario']
    """
    return player_stats.order_by('score').reverse()
