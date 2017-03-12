from flask import Flask, render_template, jsonify, request
import json

import sys
sys.setrecursionlimit(10000)

def winning(board, player):
	#print board, 1
	if (
		(board[0] == player and board[1] == player and board[2] == player) or
		(board[3] == player and board[4] == player and board[5] == player) or
		(board[6] == player and board[7] == player and board[8] == player) or
		(board[0] == player and board[3] == player and board[6] == player) or
		(board[1] == player and board[4] == player and board[7] == player) or
		(board[2] == player and board[5] == player and board[8] == player) or
		(board[0] == player and board[4] == player and board[8] == player) or
		(board[2] == player and board[4] == player and board[6] == player)
	):
		return True
	else:
		return False

def emptyIndex(board):
	return list(filter(lambda x: x != u'X' and x != u'O',board))
    
def bestMove(board,xo):
	free_moves = emptyIndex(board)

	if winning(board,u'X'):
		return {'score':-10}
	elif winning(board,u'O'):
		return {'score':10}
	elif len(free_moves) == 0:
		return {'score':0}

	moves = []
	for i in free_moves:
		move = {}
		move['index'] = i
		board[i] = xo
		#print board
		if xo == u'X':
			result = bestMove(board,u'O')
			move['score'] = result['score']
		else:
			result = bestMove(board,u'X')
			move['score'] = result['score']

		board[i] = move['index']

		moves.append(move)

	best = -1
	if(xo == u'O'):
		best_score = -100
		for i in xrange(len(moves)):
			if moves[i]['score'] > best_score:
				best_score = moves[i]['score']
				best = i;
	else:
		best_score = 100
		for i in xrange(len(moves)):
			if moves[i]['score'] < best_score:
				best_score = moves[i]['score']
				best = i;

	return moves[best]




	

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html')

@app.route('/board', methods=['POST'])
def board():
	answer = {}
	#print request.form['json_str']
	board = json.loads(request.form['json_str'])['board']
	#print board

	if(winning(board,u'X') or winning(board,u'O')):
		answer['status'] = 'end'
	else:
		answer['status'] = 'move'

	if answer['status'] == 'move':
		best_move = bestMove(board,u'O')
		answer['ans'] = best_move['index']
		print best_move


	return jsonify(answer)

if __name__ == "__main__":
	app.run(debug=True)