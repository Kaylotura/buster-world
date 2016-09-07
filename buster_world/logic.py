"""buster-world logic"""

from . import models


def _create_player_stats(name, score, time):
    return models.PlayerStats(name, score, time)