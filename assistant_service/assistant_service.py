import os
from flask import Flask, request, stream_with_context, jsonify
from flask_cors import CORS
from llama_cpp import Llama


# LLM support
def load_llm(model_path: str) -> Llama:
    return Llama(n_gpu_layers=0, model_path=model_path, seed=1, n_ctx=1024)


def query_llm(
    llm: Llama,
    question: str,
    stream: bool = False,
    max_tokens: int = 32,
    temperature: float = 0.8
):
    output = llm.create_chat_completion(
        messages=[
            {
                "role": "user",
                "content": question
            }
        ],
        max_tokens=max_tokens,
        temperature=temperature,
        stream=stream
    )
    return output


app = Flask(__name__)
CORS(app)
model = os.getenv('LLM_MODEL_PATH')
llm = load_llm(model_path=model)


@app.route("/")
def home():
    return jsonify({
        'name': 'Assistant Service',
        'version': '0.1'
    })


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question')
    max_tokens = int(data.get('max_tokens', 1024))

    if not question:
        return jsonify({'error': 'Question param is required'}), 400

    resp = query_llm(
        llm=llm,
        question=question,
        stream=True,
        max_tokens=max_tokens
    )

    def response_coroutine():
        for c in resp:
            yield c['choices'][0]['delta'].get('content', '')

    return app.response_class(stream_with_context(response_coroutine()))


if __name__ == '__main__':
    app.run(
        host=os.getenv('ASSISTANT_SERVICE_HOST', 'localhost'),
        port=os.getenv('ASSISTANT_SERVICE_PORT', 5001),
        debug=os.getenv('ASSISTANT_SERVICE_DEBUG', 'False') == 'True'
    )
