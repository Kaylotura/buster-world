"""buster-world logic"""

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
    """ Returns all the player_stats ordered by score, begining with the highest and descending from there.

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


def seperate_by_top_ten(any_list):
    """Takes in a list as an arguement and returns a dictionary with 'top' as a key, and the first 10 entries in a list
    as the value, and 'the_rest" as anoter key with a list of the remaining items as the value.

    >>> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    >>> seperate_by_top_ten(a)
    {'top': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'the_rest': [11, 12]}
    """
    return {
        'top': any_list[:10],
        'the_rest': any_list[10:]
            }